# Git Branch Management: Complete Guide

A comprehensive guide covering Git branching strategies, commands, workflows, and best practices for professional development.

## Table of Contents

1. [Creating Branches](#1-creating-branches)
2. [Viewing Branches](#2-viewing-branches)
3. [Switching Between Branches](#3-switching-between-branches)
4. [Renaming Branches](#4-renaming-branches)
5. [Deleting Branches](#5-deleting-branches)
6. [Merging Branches](#6-merging-branches)
7. [Rebasing Branches](#7-rebasing-branches)
8. [Practical Workflow Examples](#8-practical-workflow-examples)
9. [Handling Merge Conflicts](#9-handling-merge-conflicts)
10. [Cherry-Pick](#10-cherry-pick-apply-specific-commit)
11. [Git Flow Strategy](#11-git-flow-strategy-best-practices)
12. [Commands Summary](#12-common-commands-summary-table)
13. [Best Practices](#13-best-practices)
14. [Troubleshooting](#14-troubleshooting)

---

## 1. Creating Branches

Creating branches is the foundation of collaborative development. Branches allow multiple developers to work on different features simultaneously without affecting the main codebase.

### Basic Branch Creation

```bash
# Create a new branch locally
git branch feature/user-authentication

# Verify the branch was created
git branch
```

**Output:**
```
* main
  feature/user-authentication
```

### Create and Switch to a New Branch

```bash
# Traditional method (older Git versions)
git checkout -b feature/user-authentication

# Modern syntax (Git 2.23+) - Recommended
git switch -c feature/user-authentication
```

**Explanation:**
- `checkout -b` / `switch -c`: Create and immediately switch to the new branch
- `-b` flag: Create before switching
- `-c` flag: Create before switching (modern syntax)

### Create a Branch from a Specific Commit

```bash
# Create branch from specific commit hash
git branch feature/new-feature abc1234

# Create and checkout from specific commit
git checkout -b feature/new-feature abc1234

# Create from a tag
git branch feature/from-tag v1.0.0
```

**Use Case:** Fixing a bug that exists in a specific previous version without including recent changes.

### Create a Branch from a Remote Branch

```bash
# Create local branch tracking remote branch
git branch feature/sync origin/feature/existing

# Shorter syntax (Git 2.37+)
git checkout --track origin/feature/existing

# Modern syntax
git switch --track origin/feature/existing
```

---

## 2. Viewing Branches

Understanding what branches exist and their status is crucial for team coordination.

### List Local Branches

```bash
# List all local branches
git branch

# List with verbose information
git branch -v

# List with detailed info
git branch -vv
```

**Output Example:**
```
* main                              9daaa84 Initial commit
  feature/user-authentication       abc1234 Add JWT authentication
  bugfix/login-redirect             def5678 Fix redirect issue
```

### List All Branches (Local + Remote)

```bash
# List all branches
git branch -a

# List remote branches only
git branch -r

# List with tracking information
git branch -vv
```

**Output Example:**
```
* main                              9daaa84 [origin/main] Initial commit
  feature/user-authentication       abc1234 [origin/feature/user-authentication] Add JWT
  remotes/origin/develop            xyz9876 Develop branch
  remotes/origin/feature/api-integration
```

### See Merged and Unmerged Branches

```bash
# Branches merged into current branch
git branch --merged

# Branches NOT merged into current branch
git branch --no-merged

# Branches merged into specific branch
git branch --merged main

# Branches not merged into specific branch
git branch --no-merged main
```

**Use Case:** Identifying which feature branches are ready to be deleted.

---

## 3. Switching Between Branches

Switching between branches allows you to work on different features or fixes without affecting your current work.

### Switch to an Existing Branch

```bash
# Traditional method
git checkout feature/user-authentication

# Modern method (Git 2.23+) - Recommended
git switch feature/user-authentication

# Switch to previous branch
git checkout -

# Modern syntax for previous branch
git switch -
```

**Example:**
```bash
$ git switch feature/user-authentication
Switched to branch 'feature/user-authentication'
Your branch is up to date with 'origin/feature/user-authentication'.

$ git switch -
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
```

### Create and Switch in One Command

```bash
# Traditional syntax
git checkout -b feature/new-feature

# Modern syntax - Recommended
git switch -c feature/new-feature

# Create and switch from specific branch
git checkout -b feature/new-feature develop
```

### Stash Changes Before Switching

```bash
# If you have uncommitted changes:
git status

# Stash changes temporarily
git stash

# Switch branches
git switch feature/new-feature

# Later, switch back and restore stashed changes
git switch main
git stash pop
```

**Warning:** Switching branches without committing or stashing changes might result in losing unsaved work.

---

## 4. Renaming Branches

Renaming branches helps keep naming conventions consistent and descriptive.

### Rename Current Branch

```bash
# Rename the branch you're currently on
git branch -m new-branch-name

# Example
git branch -m feature/old-name
git branch -m feature/new-name

# Verify
git branch
```

### Rename a Specific Branch

```bash
# Rename specific branch (can be done from any branch)
git branch -m old-name new-name

# Example
git branch -m feature/user-auth feature/user-authentication
```

### Rename and Update Remote

```bash
# 1. Rename locally
git branch -m old-name new-name

# 2. Delete old branch from remote
git push origin --delete old-name

# 3. Push new branch with upstream tracking
git push origin -u new-name

# Complete example
git branch -m feature/auth feature/user-authentication
git push origin --delete feature/auth
git push origin -u feature/user-authentication
```

---

## 5. Deleting Branches

Clean up branches after they're merged to maintain a tidy repository.

### Delete Local Branch

```bash
# Safe delete (only if merged)
git branch -d feature/completed-feature

# Force delete (use with caution!)
git branch -D feature/abandoned-feature

# Example
git branch
git branch -d feature/user-auth
# Output: Deleted branch feature/user-auth (was abc1234).
```

**Note:**
- `-d`: Safe delete - only works if branch is merged
- `-D`: Force delete - works even if not merged

### Delete Remote Branch

```bash
# Delete branch from remote repository
git push origin --delete feature/completed-feature

# Shorter syntax
git push origin -d feature/completed-feature

# Delete multiple remote branches
git push origin --delete feature/auth feature/api
```

### Clean Up Deleted Remote Branches Locally

```bash
# Remove local references to deleted remote branches
git fetch origin --prune

# More aggressive cleanup
git fetch origin --prune --prune-tags
```

### Delete All Merged Branches

```bash
# Delete all local branches that are merged into main
git branch --merged main | grep -v main | xargs git branch -d

# For Windows:
git branch --merged main | findstr /v main | xargs git branch -d

# More careful approach (reviews before deleting)
git branch --merged main | grep -v main
# Review output, then:
git branch -d <branch-name>
```

---

## 6. Merging Branches

Merging integrates changes from one branch into another. Understanding different merge strategies is essential.

### Fast-Forward Merge

Occurs when the current branch hasn't diverged from the branch being merged.

```bash
# Switch to main branch
git checkout main

# Merge feature branch
git merge feature/user-authentication

# Output (if no conflicts):
# Fast-forward
#  src/auth.ts | 45 +++++++++++++++++++++++++++
#  1 file changed, 45 insertions(+)
```

**Visualization:**
```
Before merge:
main:      A --- B --- C
           \
feature:    D --- E

After merge:
main:      A --- B --- C --- D --- E
feature:                       ↑
```

### Three-Way Merge (with merge commit)

Occurs when branches have diverged independently.

```bash
# Merge with automatic commit message
git checkout main
git merge feature/user-authentication

# Merge with custom commit message
git merge feature/user-authentication -m "Merge user authentication feature"

# Output (if conflicts exist):
# Merge made by the 'recursive' strategy.
# Auto-merging src/auth.ts
# CONFLICT (content): Merge conflict in src/auth.ts
```

**Visualization:**
```
Before merge:
main:      A --- B --- C
           \         /
feature:    D --- E

After merge:
main:      A --- B --- C --- M (merge commit)
           \         /     /
feature:    D --- E -------
```

### No-Fast-Forward Merge

Forces a merge commit even when a fast-forward would be possible.

```bash
# Always create a merge commit
git merge --no-ff feature/user-authentication -m "Merge user authentication feature"

# Useful for maintaining clear history on main branch
```

**Visualization:**
```
Before:
main:      A --- B --- C
           \
feature:    D --- E

After (with --no-ff):
main:      A --- B --- C --- M (merge commit)
           \         /     /
feature:    D --- E -------
```

### Squash Merge

Combines all commits from the feature branch into a single commit.

```bash
# Squash and merge
git merge --squash feature/user-authentication

# This stages changes but doesn't commit, allowing you to review
git commit -m "Add user authentication feature"

# Visualization:
# Before: Feature has commits D, E
# After: Single commit with all changes
```

---

## 7. Rebasing Branches

Rebasing replays commits from one branch onto another, creating a linear history.

### Basic Rebase

```bash
# Switch to feature branch
git checkout feature/new-feature

# Rebase onto main
git rebase main

# Output (if successful):
# First, rewinding head to replay your work on top of it...
# Applying: Add new feature part 1
# Applying: Add new feature part 2
```

**Visualization:**
```
Before rebase:
main:      A --- B --- C
           \
feature:    D --- E

After: git rebase main (on feature branch)
main:      A --- B --- C
                       \
feature:                D' --- E'
```

### Rebase Conflict Resolution

```bash
# Start rebase
git rebase main

# If conflicts occur:
# 1. Edit conflicting files
# 2. Stage resolved files
git add <resolved-file>

# Continue rebase
git rebase --continue

# Or skip the commit
git rebase --skip

# Or abort entirely
git rebase --abort
```

### Interactive Rebase

Allows fine-grained control over commits being rebased.

```bash
# Interactive rebase of last 3 commits
git rebase -i HEAD~3

# Interactive rebase onto main
git rebase -i main

# Pick a commit from history
git rebase -i <commit-hash>
```

**Interactive Rebase Commands:**
```
pick   abcd123  Add feature part 1      # Use commit
reword def5678  Add feature part 2      # Use commit, but edit message
squash ghi9012  Fix typo                # Use commit, meld into previous
fixup  jkl3456  Another fix            # Like squash, discard log message
drop   mno7890  Temporary debug code    # Remove commit
```

**Example Interactive Rebase Session:**
```bash
$ git rebase -i HEAD~4
# Opens editor with:
pick abc1234 Add user model
pick def5678 Add authentication
pick ghi9012 Fix validation bug
pick jkl3456 Update tests

# Edit to:
pick abc1234 Add user model
squash def5678 Add authentication
squash ghi9012 Fix validation bug
squash jkl3456 Update tests

# Save and exit - results in single commit with all changes
```

### Rebase vs Merge Comparison

```bash
# MERGE: Preserves branch history
git merge feature/xyz
# Results in: explicit merge commit, both branches visible

# REBASE: Creates linear history
git rebase feature/xyz
# Results in: linear sequence, cleaner history

# Best Practice:
# - Use rebase for local branches before pushing
# - Use merge for shared/public branches
```

---

## 8. Practical Workflow Examples

### Feature Branch Workflow

The most common workflow for team development.

```bash
# 1. Create feature branch
git checkout -b feature/add-dark-mode

# 2. Make changes and commits
echo "// Dark mode implementation" > src/theme.ts
git add src/theme.ts
git commit -m "Add dark mode toggle component"

echo "// Dark mode styles" >> src/styles/dark.css
git add src/styles/dark.css
git commit -m "Add dark mode styles and transitions"

# 3. Update with latest main (if needed)
git fetch origin
git rebase origin/main

# 4. Push to remote
git push origin feature/add-dark-mode

# 5. Create Pull Request on GitHub/GitLab
# (via web interface)

# 6. After PR approval and CI passes, merge
git checkout main
git pull origin main
git merge feature/add-dark-mode

# 7. Push merged changes
git push origin main

# 8. Delete feature branch locally and remotely
git branch -d feature/add-dark-mode
git push origin --delete feature/add-dark-mode
```

### Hotfix Branch Workflow

For urgent production fixes.

```bash
# 1. Create hotfix branch from main
git checkout -b hotfix/fix-login-bug main

# 2. Make minimal, focused fix
git add src/auth.ts
git commit -m "Fix login redirect issue"

# 3. Test thoroughly
npm test

# 4. Merge back to main
git checkout main
git merge --no-ff hotfix/fix-login-bug -m "Hotfix: Fix login redirect"

# 5. Tag the release
git tag -a v1.0.1 -m "Production hotfix 1.0.1"

# 6. Merge to develop as well
git checkout develop
git merge --no-ff hotfix/fix-login-bug

# 7. Push everything
git push origin main
git push origin develop
git push origin v1.0.1

# 8. Delete hotfix branch
git branch -d hotfix/fix-login-bug
git push origin --delete hotfix/fix-login-bug
```

### Release Branch Workflow

For preparing production releases.

```bash
# 1. Create release branch from develop
git checkout -b release/1.0.0 develop

# 2. Bump version numbers
# Edit: package.json, version.ts, CHANGELOG.md
git add package.json version.ts CHANGELOG.md
git commit -m "Bump version to 1.0.0"

# 3. Only bug fixes allowed on release branch
git add src/bugfix.ts
git commit -m "Fix critical bug for release"

# 4. Merge to main
git checkout main
git merge --no-ff release/1.0.0 -m "Release version 1.0.0"

# 5. Create version tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# 6. Merge back to develop
git checkout develop
git merge --no-ff release/1.0.0

# 7. Push all changes and tags
git push origin main develop
git push origin v1.0.0

# 8. Delete release branch
git branch -d release/1.0.0
git push origin --delete release/1.0.0
```

### Bugfix Branch Workflow

For non-critical bugs in development.

```bash
# 1. Create bugfix branch from develop
git checkout -b bugfix/fix-user-validation develop

# 2. Fix the bug with meaningful commits
git add src/validation.ts
git commit -m "Fix email validation regex"

git add tests/validation.test.ts
git commit -m "Add test cases for email validation"

# 3. Ensure tests pass
npm test

# 4. Rebase to clean up commits if needed
git rebase -i develop

# 5. Merge to develop
git checkout develop
git merge bugfix/fix-user-validation

# 6. Push changes
git push origin develop

# 7. Delete bugfix branch
git branch -d bugfix/fix-user-validation
```

---

## 9. Handling Merge Conflicts

Conflicts occur when changes in different branches affect the same parts of files.

### Understanding Conflict Markers

```typescript
// Conflicted file content
function processData() {
<<<<<<< HEAD
  return data.map(item => item.value);
======= 
  return data.filter(item => item.active).map(item => item.value);
>>>>>>> feature/add-filtering
}
```

**Markers Explanation:**
- `<<<<<<<< HEAD`: Current branch changes
- `========`: Separator
- `>>>>>>> feature/add-filtering`: Incoming branch changes

### Resolving Conflicts

```bash
# 1. Attempt merge
git merge feature/add-filtering

# 2. Check conflict status
git status

# Output:
# On branch main
# You have unmerged paths.
#   (fix conflicts and run "git commit")
# 
# Unmerged paths:
#   (use "git add <file>..." to mark resolution)
#   both modified:   src/data.ts

# 3. Open conflicted file and manually resolve
# Choose which version to keep, or combine both

# 4. After editing, mark as resolved
git add src/data.ts

# 5. Complete merge
git commit -m "Resolve merge conflicts: combine data processing logic"
```

### Merge Conflict Resolution Strategies

```bash
# Use their version completely
git checkout --theirs src/data.ts
git add src/data.ts

# Use our version completely
git checkout --ours src/data.ts
git add src/data.ts

# Abort entire merge
git merge --abort

# Use merge tool for visual conflict resolution
git mergetool

# Continue after using mergetool
git add <resolved-files>
git commit
```

### Rebase Conflict Resolution

```bash
# Conflicts during rebase
git rebase main

# Resolve conflicts in files

# Mark resolved
git add <resolved-files>

# Continue rebase
git rebase --continue

# Or abort
git rebase --abort
```

---

## 10. Cherry-Pick (Apply Specific Commit)

Cherry-pick allows applying a specific commit from one branch to another.

### Basic Cherry-Pick

```bash
# Apply specific commit to current branch
git cherry-pick abc1234

# Output:
# [main 5ef6789] Add feature from feature branch
# 1 file changed, 5 insertions(+)
```

**Use Case:** Applying a bug fix from develop to main without merging the entire branch.

### Cherry-Pick Multiple Commits

```bash
# Pick consecutive commits
git cherry-pick abc1234^..def5678

# Pick specific commits
git cherry-pick abc1234 def5678 ghi9012

# Pick commits from a range
git cherry-pick main..feature/xyz
```

### Cherry-Pick with Conflict Resolution

```bash
# Start cherry-pick
git cherry-pick abc1234

# If conflicts occur:
# 1. Resolve conflicts manually
# 2. Stage resolved files
git add <resolved-files>

# Continue cherry-pick
git cherry-pick --continue

# Or skip this commit
git cherry-pick --skip

# Or abort
git cherry-pick --abort
```

### Cherry-Pick Options

```bash
# Cherry-pick without auto-committing (review first)
git cherry-pick -n abc1234

# Cherry-pick and edit commit message
git cherry-pick -e abc1234

# Cherry-pick and keep original author
git cherry-pick abc1234
```

---

## 11. Git Flow Strategy (Best Practices)

Git Flow is a robust branching model for release management.

### Branch Structure

```
main (production)
  ↑ (only merge release and hotfix)
  
develop (staging)
  ↑ (main integration branch)

feature/* (feature development)
  ↓ (merge from develop)

release/* (release preparation)
  ↓ (from develop → main + develop)

hotfix/* (production fixes)
  ↓ (from main → main + develop)
```

### Complete Git Flow Example

```bash
# ============ NEW FEATURE ============

# 1. Create feature from develop
git checkout -b feature/user-dashboard develop

# 2. Work on feature
git add src/dashboard.ts
git commit -m "Add dashboard components"

# 3. Create PR and get reviewed

# 4. Merge to develop
git checkout develop
git pull origin develop
git merge --no-ff feature/user-dashboard

# 5. Push and delete
git push origin develop
git push origin --delete feature/user-dashboard


# ============ PREPARE RELEASE ============

# 1. Create release branch
git checkout -b release/1.2.0 develop

# 2. Update version and changelog
git add package.json CHANGELOG.md
git commit -m "Bump version to 1.2.0"

# 3. Only bug fixes on release branch
git add src/bugfix.ts
git commit -m "Fix production bug"

# 4. Merge to main
git checkout main
git pull origin main
git merge --no-ff release/1.2.0 -m "Release 1.2.0"
git tag -a v1.2.0 -m "Version 1.2.0"

# 5. Merge back to develop
git checkout develop
git pull origin develop
git merge --no-ff release/1.2.0

# 6. Push everything
git push origin main develop v1.2.0
git push origin --delete release/1.2.0


# ============ HOTFIX (EMERGENCY) ============

# 1. Create hotfix from main
git checkout -b hotfix/critical-fix main

# 2. Fix critical issue
git add src/critical.ts
git commit -m "Fix critical production bug"

# 3. Merge to main
git checkout main
git merge --no-ff hotfix/critical-fix
git tag -a v1.2.1 -m "Hotfix 1.2.1"

# 4. Merge to develop
git checkout develop
git merge --no-ff hotfix/critical-fix

# 5. Push and cleanup
git push origin main develop v1.2.1
git branch -d hotfix/critical-fix
git push origin --delete hotfix/critical-fix
```

---

## 12. Common Commands Summary Table

| Command | Purpose | Example |
|---------|---------|---------|
| `git branch` | List local branches | `git branch` |
| `git branch -a` | List all branches | `git branch -a` |
| `git branch <name>` | Create branch | `git branch feature/xyz` |
| `git branch -b <name>` | Create and switch | `git checkout -b feature/xyz` |
| `git switch -c <name>` | Create and switch (modern) | `git switch -c feature/xyz` |
| `git checkout <branch>` | Switch branch | `git checkout main` |
| `git switch <branch>` | Switch branch (modern) | `git switch main` |
| `git branch -d <name>` | Delete branch | `git branch -d feature/xyz` |
| `git branch -D <name>` | Force delete | `git branch -D feature/xyz` |
| `git push origin --delete <name>` | Delete remote branch | `git push origin --delete feature/xyz` |
| `git branch -m <old> <new>` | Rename branch | `git branch -m old new` |
| `git merge <branch>` | Merge branch | `git merge feature/xyz` |
| `git merge --no-ff <branch>` | Merge with commit | `git merge --no-ff feature/xyz` |
| `git merge --squash <branch>` | Squash and merge | `git merge --squash feature/xyz` |
| `git rebase <branch>` | Rebase onto branch | `git rebase main` |
| `git rebase -i HEAD~3` | Interactive rebase | `git rebase -i HEAD~3` |
| `git cherry-pick <commit>` | Apply specific commit | `git cherry-pick abc1234` |
| `git branch --merged` | See merged branches | `git branch --merged` |
| `git branch --no-merged` | See unmerged branches | `git branch --no-merged` |
| `git fetch --prune` | Cleanup deleted remotes | `git fetch origin --prune` |

---

## 13. Best Practices

### Naming Conventions

```bash
# Good branch names:
git branch feature/user-authentication
git branch bugfix/login-redirect-issue
git branch hotfix/critical-memory-leak
git branch docs/update-readme
git branch refactor/simplify-auth-logic

# Bad branch names:
git branch feature1              # Too vague
git branch fix-bug               # Unclear
git branch test                  # Not descriptive
git branch johnsmith-changes     # Personal names
git branch WIP-stuff             # Unclear status
```

### Commit Hygiene

```bash
# Before merging, keep commits clean and logical
git log feature/xyz --oneline

# Rebase to organize commits
git rebase -i develop

# Result: logical, easy-to-review commit history
```

### Keep Branches Up to Date

```bash
# Regularly fetch latest changes
git fetch origin

# Rebase on latest main
git rebase origin/main

# Or merge if preferred
git merge origin/main

# Push updated branch
git push origin feature/xyz --force-with-lease
```

### Code Review Before Merging

```bash
# Review commits before merge
git log main..feature/xyz

# Review actual changes
git diff main..feature/xyz

# Use Pull Requests for team review
# (via GitHub/GitLab web interface)
```

### Delete Merged Branches

```bash
# Keep repository clean
git branch --merged main | grep -v main | xargs git branch -d

# Cleanup remote
git fetch origin --prune
```

### Use Protection Rules

```bash
# GitHub: Settings → Branches → Branch Protection Rules
# - Require pull request reviews
# - Require status checks to pass
# - Dismiss stale PR approvals
# - Require branches to be up to date
```

### Meaningful Commit Messages

```bash
# Good commit message format:
# <type>: <description>
# 
# <detailed explanation if needed>

# Examples:
git commit -m "feat: add dark mode toggle"
git commit -m "fix: resolve login redirect bug"
git commit -m "docs: update installation guide"
git commit -m "refactor: simplify auth logic"
git commit -m "test: add validation tests"
```

---

## 14. Troubleshooting

### "Branch already exists" Error

```bash
# Problem: Trying to create a branch that exists
git branch feature/xyz
# fatal: A branch named 'feature/xyz' already exists.

# Solution: Use different name or delete existing
git branch -d feature/xyz
git branch feature/xyz-v2
```

### "Cannot delete branch" Error

```bash
# Problem: Branch not fully merged
git branch -d feature/xyz
# error: The branch 'feature/xyz' is not fully merged.

# Solution 1: Force delete (if sure)
git branch -D feature/xyz

# Solution 2: Merge first
git checkout main
git merge feature/xyz
git branch -d feature/xyz
```

### Lost Commits After Rebase

```bash
# Problem: Commits seem lost after rebase
# Solution: Use reflog to find lost commits
git reflog

# Output shows all recent operations
# abc1234 HEAD@{0}: rebase: Fix validation
# def5678 HEAD@{1}: rebase: Add feature
# ghi9012 HEAD@{2}: checkout: moving to main

# Recover lost commit
git checkout ghi9012
git branch feature/recovered
```

### Accidental Branch Deletion

```bash
# Problem: Deleted important branch
git branch -D feature/important
# Deleted branch feature/important (was abc1234).

# Solution: Recover using reflog
git reflog

# Find the commit
# abc1234 HEAD@{5}: commit: Important work

# Recreate branch
git branch feature/important abc1234
```

### Stuck in Merge/Rebase

```bash
# Problem: Merge or rebase in progress
git status
# On branch main
# You are currently merging.

# Solution 1: Abort
git merge --abort

# Solution 2: Abort rebase
git rebase --abort

# Solution 3: Complete merge after resolving conflicts
git add <resolved-files>
git commit
```

### Push Rejected (Out of Sync)

```bash
# Problem: Push rejected because branch is behind
git push origin feature/xyz
# rejected...reason: non-fast-forward

# Solution: Update before pushing
git fetch origin
git rebase origin/feature/xyz

# Or merge
git merge origin/feature/xyz

# Then push
git push origin feature/xyz
```

### Branch Tracking Issues

```bash
# Problem: Branch not tracking remote
git branch -v
# feature/xyz  abc1234 ...no upstream

# Solution 1: Set upstream
git push -u origin feature/xyz

# Solution 2: Set upstream for existing
git branch -u origin/feature/xyz

# Solution 3: Configure in config
git config branch.feature/xyz.remote origin
git config branch.feature/xyz.merge refs/heads/feature/xyz
```

---

## Quick Reference Commands

```bash
# Create & switch to feature
git checkout -b feature/my-feature

# List all branches
git branch -a

# Update from remote
git fetch origin && git rebase origin/main

# Merge feature to main
git checkout main && git merge --no-ff feature/my-feature

# Delete local branch
git branch -d feature/my-feature

# Delete remote branch
git push origin --delete feature/my-feature

# Rename branch
git branch -m old-name new-name

# Interactive rebase last 3 commits
git rebase -i HEAD~3

# Cherry-pick commit
git cherry-pick abc1234

# View commits not in main
git log main..feature/my-feature

# Cleanup stale remote references
git fetch origin --prune
```

---

## Additional Resources

- [Pro Git Book - Branches](https://git-scm.com/book/en/v2/Git-Branching)
- [GitHub Branching Strategy](https://guides.github.com/introduction/flow/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials/using-branches)
- [Git Flow Cheatsheet](https://danielkummer.github.io/git-flow-cheatsheet/)

---

## Contributing

When working with this repository:

1. Create feature branches from `develop`
2. Use meaningful branch names with prefixes: `feature/`, `bugfix/`, `hotfix/`
3. Keep commits atomic and well-documented
4. Rebase before creating pull requests
5. Ensure all tests pass before merging
6. Delete branches after merging

---

**Last Updated:** June 2026

