### Instalation

Install the CLI Globally

    npm install -g create-react-template-cli

Or install the CLI as a Dev dependency

    npm install -D create-react-template-cli


### Usage
To create a new project run:

    rt init

Then answer the questions, once the project is ready run

    cd your-new-project

### Create a component
To create a component run:

    rt create component MyComponent
or

    rt c c MyComponent

### Create a page
To create a page run:

    rt create page MyPage
or

    rt c p MyPage

### Using the CLI on an existing project
Is posible to use the CLI on an existing project, just create a file named `react-template.json` at the root of your project with the following content.

```json
{
    "project-name":"a-test2",
    "language":"typescript",
    "styleExt":"scss",
    "compType":"func",
    "path": {
        "components":"src/components",
        "pages":"src/pages",
        "styles":"src/styles"
    }
}
```

- Change the `"language"` property to `javascript` or `typescript`.
- Set the  `styleExt` property according to your project needs, options are `css`, `scss` `sass` or `less` (Less requires manual configuration).
- In the `path` property you can specify the location of your components folder.

### Commands available
`rt init` or `rt i` creates a new project

`rt generate component <CompName>` or `rt g c <CompName>` creates a component or page

`rt create page <PageName>` or `rt c p <PageName>` creates a component or page



