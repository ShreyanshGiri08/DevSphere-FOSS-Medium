#  DevSphere: The Shopping Cart Merge Adventure

It's a bright Monday morning, and you're stepping into the office, coffee in hand, ready to tackle the week. Your tech lead pulls you aside with an important mission.

"Hey there," they say, looking slightly stressed. "Alice and Bob were working on two critical features for our Shopping Cart service over the weekend. Alice added a brilliant new discount and promo code system, while Bob implemented our regional taxes and shipping calculations."

"Great," you reply, thinking this will be an easy start to the day.

"Well, not exactly," the lead sighs. "They both edited the core logic in `ShoppingCart.js` and `index.js`, and their branches have some overlapping changes. We need you to integrate them without breaking either feature. The success of our upcoming launch depends on it!"

###  Your Mission

You are stepping into the shoes of the lead developer to integrate these two critical features.

1. First, make sure you have generated the challenge repository by running the `setup-merge-challenge.sh` script.
2. Navigate into the freshly created challenge folder:
   ```bash
   cd merge-conflict-challenge
   ```
3. To kick things off, you'll need to fetch and merge Alice's branch into your current workspace. Run this command:
   ```bash
   git merge feature/discounts
   ```
4. Once you have successfully resolved the merge conflicts, verify your solution by running the tests:
   ```bash
   node test.js
   ```

Now it's up to you to carefully analyze the overlapping code, piece their logic together, and ensure the shopping cart works flawlessly with both discounts and taxes applied! Good luck, the team is counting on you!
