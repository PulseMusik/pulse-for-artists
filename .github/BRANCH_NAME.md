## 1. Main Branch:
- `main`
  - **Purpose**: Default, stable branch. All production-ready code should reside here.

---

## 2. Feature Branch:
- `feature/[short-description]`
  - **Purpose**: For developing new features or enhancements.
  - **Example**: `feature/add-user-authentication`, `feature/update-dashboard-ui`

---

## 3. Bugfix Branch:
- `bugfix/[short-description]`
  - **Purpose**: For fixing bugs or addressing minor issues.
  - **Example**: `bugfix/fix-login-page-validation`, `bugfix/resolve-signup-error`

---

## 4. Hotfix Branch:
- `hotfix/[short-description]`
  - **Purpose**: For urgent fixes, typically required in production immediately.
  - **Example**: `hotfix/fix-production-crash`, `hotfix/resolve-api-endpoint-issue`

---

## 5. Refactor Branch:
- `refactor/[short-description]`
  - **Purpose**: For restructuring or cleaning up code without changing its functionality.
  - **Example**: `refactor/clean-up-auth-logic`, `refactor/restructure-folder-structure`

---

## 6. Chore Branch:
- `chore/[short-description]`
  - **Purpose**: For non-feature tasks such as maintenance, dependency updates, or small improvements.
  - **Example**: `chore/update-dependencies`, `chore/clean-up-unused-files`

---

## 7. Infrastructure Branch:
- `infra/[short-description]`
  - **Purpose**: For infrastructure-related changes like server settings or deployment scripts.
  - **Example**: `infra/update-docker-config`, `infra/setup-ci-cd-pipeline`

---

## 8. Testing Branch:
- `test/[short-description]`
  - **Purpose**: For adding or modifying tests, or working on testing configurations.
  - **Example**: `test/integrate-jest`, `test/setup-end-to-end-tests`

---

## 9. Experimental Branch:
- `experiment/[short-description]`
  - **Purpose**: For trying out experimental features or new approaches.
  - **Example**: `experiment/try-new-ui-framework`, `experiment/test-new-api-design`
  
---

## Example Branch Names

- `feature/user-profile-page`
- `bugfix/fix-login-validation`
- `hotfix/fix-crash-on-login`
- `refactor/restructure-authentication`
- `chore/update-dependencies`
- `infra/update-server-config`
- `test/add-unit-tests-for-login`
- `experiment/test-graphql-approach`

---

### General Guidelines

1. **Be Descriptive but Concise**: Branch names should clearly describe the purpose of the branch. Keep it short but meaningful.
2. **Use Hyphens for Separation**: Use `-` to separate words in branch names for readability.
3. **Prefix for Branch Type**: Use appropriate prefixes like `feature/`, `bugfix/`, `hotfix/` based on the type of task you're working on.
4. **Consistency**: Stick to this naming convention for all branches to maintain a clean and organized workflow.
5. **Avoid Special Characters**: Stick to lowercase letters, numbers, and hyphens. Avoid using spaces or special characters.