<p align="center"><h1 align="center">OSU-CLASS-PLANNER</h1></p>
<br>

##  Table of Contents

- [ Overview](#-overview)
- [ Project Structure](#-project-structure)
- [ Getting Started](#-getting-started)
  - [ Prerequisites](#-prerequisites)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
- [ Contributing](#-contributing)

---

##  Overview

This project is a class planner alternative to MyDegrees. It allows the creation of class plans and can check the course requirements of the Major. It supports all minors, majors, and colleges.

---

##  Project Structure

```sh
└── OSU-Class-Planner/
    ├── README.md
    ├── package.json
    ├── postcss.config.js
    ├── src
    │   ├── app.css
    │   ├── app.d.ts
    │   ├── app.html
    │   ├── lib
    │   └── routes
    ├── static
    │   ├── data
    │   └── favicon.png
    ├── svelte.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    └── vite.config.ts
```

---
##  Getting Started

###  Prerequisites

Before getting started with OSU-Class-Planner, ensure your runtime environment meets the following requirements:

- **Programming Language:** TypeScript
- **Package Manager:** PNPM


###  Installation

Install OSU-Class-Planner using one of the following methods:

**Build from source:**

1. Clone the OSU-Class-Planner repository:
```sh
❯ git clone https://github.com/AidanSchmitigal/OSU-Class-Planner
```

2. Navigate to the project directory:
```sh
❯ cd OSU-Class-Planner
```

3. Install the project dependencies:


**Using `pnpm`**

```sh
❯ pnpm install
```




###  Usage
Run OSU-Class-Planner using the following command:
**Using `pnpm`**
```sh
❯ pnpm start
```
--

##  Contributing

- **🐛 [Report Issues](https://github.com/AidanSchmitigal/OSU-Class-Planner/issues)**: Submit bugs found or log feature requests for the `OSU-Class-Planner` project.
- **💡 [Submit Pull Requests](https://github.com/AidanSchmitigal/OSU-Class-Planner/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/AidanSchmitigal/OSU-Class-Planner
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
7. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>
