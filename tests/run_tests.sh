
set -uo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SAMPLES="$ROOT/samples"



compile() {
  # No compilation needed
  :
}

run() {
  if node "$ROOT/test.js" >/dev/null 2>&1; then
      echo "PASS"
  else
      echo "FAIL"
      exit 1
  fi
}
export -f run

TIMEOUT=40

_run_timed() {
  local secs=$1; shift
  if command -v timeout &>/dev/null && timeout --version &>/dev/null 2>&1; then
    timeout "${secs}s" "$@"
  elif command -v gtimeout &>/dev/null; then
    gtimeout "${secs}s" "$@"
  else
    "$@"
  fi
}

echo "── Compile ──────────────────────────────────────────────"
if ! compile 2>&1; then
  echo ""
  echo "FATAL: Build/compile step failed."
  exit 1
fi
echo "OK"
echo ""

echo "── Tests ────────────────────────────────────────────────"
PASS=0
FAIL=0

for in_file in "$SAMPLES"/in_*.txt; do
  [[ -e "$in_file" ]] || { echo "No test inputs found in samples/"; break; }

  name=$(basename "$in_file" .txt | sed 's/^in_//')
  exp="$SAMPLES/out_${name}.txt"

  if [[ ! -f "$exp" ]]; then
    echo "SKIP  $name  (no expected output file out_${name}.txt)"
    continue
  fi

  if actual=$(_run_timed "$TIMEOUT" bash -c 'run "$1"' _ "$in_file" 2>/dev/null); then
    # Strip trailing whitespace to tolerate CRLF vs LF differences
    if diff <(printf '%s\n' "$actual" | sed 's/[[:space:]]*$//') \
            <(sed 's/[[:space:]]*$//' "$exp") > /dev/null 2>&1; then
      echo "PASS  $name"
      PASS=$((PASS + 1))
    else
      echo "FAIL  $name  — wrong output"
      echo "  expected: $(head -3 "$exp" | tr '\n' '|')"
      echo "  got:      $(printf '%s\n' "$actual" | head -3 | tr '\n' '|')"
      FAIL=$((FAIL + 1))
    fi
  else
    ec=$?
    [[ $ec -eq 124 ]] && echo "FAIL  $name  — TLE (>${TIMEOUT}s)" \
                       || echo "FAIL  $name  — runtime error (exit $ec)"
    FAIL=$((FAIL + 1))
  fi
done

echo ""
echo "────────────────────────────────────────────────────────"
echo "  Result: $PASS passed, $FAIL failed"
echo "────────────────────────────────────────────────────────"

[[ $FAIL -eq 0 ]]
