# Code of conducts

**tcf-microservices**

## --- GIT ---

Main branch : _Master_
Dev branch : _For development_

**For new features** :

- Create a new branch "Feature/<name_of_the-feature>"
- Then once the feature is done
- Make a pull request, from the branch you created into dev
- Delete the Feature branch

### Message Commit

How to write a good commit message
**Step to follow** :

- Ask you the good questions about your commit :
  - Why have I made these changes?
  - What effect have my changes made?
  - Why was the change needed?
  - What are the changes in reference to?
- Add a type for your commit
  - `feat` – a new feature is introduced with the changes
  - `fix` – a bug fix has occurred
  - `chore` – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
  - `refactor` – refactored code that neither fixes a bug nor adds a feature
  - `docs` – updates to documentation such as a the README or other markdown files
  - `style` – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
  - `test` – including new or correcting previous tests
  - `perf` – performance improvements
  - `ci` – continuous integration related
  - `build` – changes that affect the build system or external dependencies
  - `revert` – reverts a previous commit
- Write your commit message : git commit
  - `git commit -m "Feat: My commit message which explain in detail my changes"`
