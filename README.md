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

### Create a nested component or page
If you need to create a component inside an existing component you can add a 4th argument with the name of the parent component like these two examples

    rt create component NestedComponent ParentComponent (this will create a new component in src/components/ParentComponent/NestedComponent)
or if you need to create a component inside of a page 
    rt create page NestedComponent ParentPage (this will create a new component in src/pages/ParentPage/NestedComponent)

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
- Set the  `"styleExt"` property according to your project needs, options are `css`, `scss` `sass` or `less` (Less requires manual configuration).
- Set the `"compType"` property to specify the component template when create a new components, options are `func` or `class`
- In the `path` property you can specify the location of your components folder.

### Commands available
`rt init` Creates a new project.
`rt i` Creates a new project.

`rt generate component <ComponentName>` Creates a component or page.
`rt g c <ComponentName>` Creates a component or page.

`rt create page <PageName>` Creates a component or page.
`rt c p <PageName>` Creates a component or page.

`rt create component <ComponentName> <ParentComponent>` Creates a component inside an existing component or page.
`rt g p <ComponentName> <ParentPage>` Creates a component inside an existing component or page.