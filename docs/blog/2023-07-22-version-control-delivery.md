---
date: 2023-07-22
title: Version Control With Continuous Delivery
---

There's a million different ways to do version control in a team environment while also accomplishing continuous
delivery. I'm going to go over my personal favorite approach in this blog with the understanding that there are
positives and negatives to it.

---

## Goals

The goals I want to accomplish when writing software are as follows:

- Keeps the commit history clean
  - No merge commits
- Not prone to post-merge test failures
- Works well with CI/CD platforms
- Integrates natively in many version control UIs

## Trunk Based Development

My personal choice for achieving this goal is trunk-based development. It can accomplish all of these goals with minimal
drawbacks. This approach uses one primary branch that feature branches are merged into, while also following a linear
commit history. Changes are only to be merged in if they are complete, and if it's to deliver some base functionality
for other features, feature flagged where applicable.

## Positives

- Linear commit history
  - Because all changes are rebased against the primary branch, there is no need for merge commits
  - Because all changes use the primary branch as a base, you will know prior to merge if you broke any functionality
    that was merged in between you starting the work and preparing for merge
- Clean commit history
  - This strategy is a lot more friendly with the squash and merge approach especially when working on bite sized blocks
    of work
- Less error prone
  - Because of the linear commit history, you're always required to have all commits that have come before you, ensuring
    you don't break any existing functionality
- Supported by GitHub/GitLab
  - Most, if not all, GUIs and websites support this functionality if enabled

## Negatives

- Requires a bit of education
  - I can't really see this as detriment, but I feel most developers only commit, push, and pull
  - Merge conflicts can be more daunting
- Pull/merge requests require rebasing prior to merging if new changes have been staged
- It does not scale well, especially with long CI/CD runs
- If using feature flags, it is easy to have an extended run and forget about cleaning up the flag without proper
  project management

## Tips and Tricks

- One trick to be more effective using linear history trunk-based development is to toggle `rerere.enabled`, which will
  allow you to easily manage merge conflicts against your commits. Part of the problem with rebasing is that merge
  conflicts may have to be resolved across several commits.
- Feature flagging doesn't have to be associated with a third party toggling system. The same can be accomplished with
  environment variables or other facilities to enable or disable functionality. Feel free to make use of it to deliver
  and prove functionality early, that's what it's there for.
