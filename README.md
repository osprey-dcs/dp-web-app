# Data Platform Web Application

## Getting Started

<p>Before attempting to start the web application, ensure your Envoy, Apache, and MongoDB containers are running. Start the query and annotation services, as well as the ingestion service if you need to populate your MongoDB.</p>

`npm install` installs packages and dependencies for the project. Run after pulling the project for the first time or after new dependencies have been added.<br>
`npm run tailwind` starts running Tailwind for development. Upon any file save, the tailwind file will be scanned for Tailwind utility classes to update `src/output.css`. Run when developing.<br>
`npm run dev` runs the web application locally, hosted at <localhost:5173>. Run when developing or testing.

## File System

### Proto Files and API

Proto files are housed in the `protos/` directory. Custom API code is written in `src/domain/grpc-client/DataPlatformApi.js`. Generated proto stubs are in `src/domain/grpc-client/proto-ts/`

Complete the following steps to update the web app to a new data-platform verision:<br>

1. Move or rename your old `data-platform` directory. Download and unpack the data platform installer in the same directory as `dp-web-app`.
2. Delete the proto files in `dp-web-app/protos/`. Copy the proto files from `data-platform/proto/` into the now-empty `protos/` directory.
3. Delete the old proto stubs from `dp-web-app/src/domain/grpc-client/proto-ts/`
4. Run `npm run protos` in a terminal in the `dp-web-app/` directory. This will generate new stubs and save them in the now-empty `proto-ts/` directory. This command is a shortcut for a longer command: `npx protoc --ts_out src/domain/grpc-client/proto-ts --ts_opt output_javascript_es2020 --proto_path protos annotation.proto common.proto query.proto`

Information about the `protobuf-ts` package can be found [here](https://github.com/timostamm/protobuf-ts/blob/main/README.md). **Note:** While the package mostly concerns generating stubs for a Typescript project, we use the `output_javascript_es2020` option to generate stubs in Javascript with support for ECMAScript-style imports (as opposed to the CommonJS style imports in the old version of the web application).

### Tailwind and Styling

The Tailwind input and output files are `src/input.css` and `src/output.css`. `input.css` holds custom styling for different global and ag-grid color modifiers, in addition to a few custom css classes in the bottom `components` section. `output.css` is auto-generated and should not be modified.

Read more about Tailwind at their [docs](https://tailwindcss.com/docs/installation/tailwind-cli). Here is the most up to date [cheat sheet](https://www.creative-tim.com/twcomponents/cheatsheet/) that I could find. It covers Tailwind 3.0.24, but should cover all of the utility classes used in this repository. For reference, the current Tailwind version is 4.1.

**Note:** It looks like there is now a [new way to integrate Tailwind](https://tailwindcss.com/docs/installation/using-vite) with Vite that is more streamlined than using the CLI. However, it seems the CLI is still acceptable and is not legacy or bad practice.

### Custom Components and Workflow

Reusable components are located in `src/components/ui/`. Most of said components are imported from the [shadcn/ui](https://ui.shadcn.com/) component library.

The majority of source code is located in `src/components/main/`. The ensuing code is a tree of components stemming from `Main.jsx`, which uses the Wouter npm package to render each of the main browsing pages: `BrowseMetadata.jsx`, `BrowseRawData,jsx`, `BrowseDataSets.jsx`, and `BrowseAnnotations.jsx`. `Main.jsx` also renders `Header.jsx` and `PvSheet.jsx`, which appear regardless of the browse page.

Each browse page is broken into two main sub-components "actions" and "results". "Actions" encompasses the search filters and "Run Query" button and "results" encompasses the ag-grid table with result data.

> **Note:** `BrowseRawData.jsx` was the first component written and instead of actions and results following the naming convention (which would have them named "rawDataActions" and "rawDataResults"), they are named `QueryActions.jsx` and `QueryResults.jsx`. These should likely be renamed to follow the naming convention. **Additionally** `BrowseMetadata.jsx` is the only of the 4 browse pages to not have its own "actions" page. It reuses `QueryActions.jsx` from the aforementioned `BrowseRawData.jsx`.

Most API calls are initiated from the relevant "actions" pages following the click of a "Run Query" button. Query data is consolidated to a single object within said actions page and sent to `src/domain/grpc-client/DataPlatformApi.js`, where data is formatted for submission to the data-platform back end.

> **Note:** `BrowseAnnotations.jsx` renders a third component, `AddAnnotationControl.jsx`. This component contains logic for displaying an annotation creation form; the subsequently rendered component `AddAnnotationActions.jsx` renders the specific form fields and submit button. This component appears as a plus icon inside of a circle on the Browse Annotations page.

#### Component Creation Example:

Say you would like to add an additional query parameter "Data Sets" for querying through annotations that would allow users to search for annotations linked to a data set or sets. Navigate to `src/components/main/browseAnnotations/annotationActions/` and you will see the `AnnotationActions.jsx` component, as well as subfolders for the comment chip and owner id chip. You would create a similar folder, likely `dataSetsChip/`, and follow the structure of the other chips. Your `dataSetsChip/DataSetsChip.jsx` file would include logic and styling for displaying the chip in addition to logic for positioning the pop-up to input the data sets themselves. Your `dataSetsChip/dataSetsActions/DataSetsActions.jsx` file would include logic for styling and submitting the actual content of the pop-up modal. For example: a text field or dropdown for entering data set IDs and an apply button.

The tricky thing about creating a chip is recognizing where to store the state (the variables that hold the values of your data). Your state for the data (perhaps a string or list) would live in the `DataSetsChip.jsx` file. A function to set the value of this state variable would be passed down to your `DataSetsActions.jsx` file, so that you can change the value of the state variable based on whatever value is entered into your data set IDs field but **render that value at the `DataSetsChip.jsx` level**. See the React docs page [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component). However, we still need to figure out a way to get the data up to the `AnnotationActions.jsx` file so we can send it to `DataPlatformApi.js` when we want to run our query. A state variable `queryParams` is initiated in `AnnotationActions.jsx`. You will want to pass `setQueryParams` to `DataSetsChip.jsx` and subsequently to `DataSetsActions.jsx` so that, when you hit "Apply", the data is stored in the `AnnotationActions.jsx` file and is able to be shipped off when calling the api. For further clairit, investigate the existing component `src/components/main/browseAnnotatinons/annotationActions/ownerIdChip/OwnerIdChip.jsx`. Investigate where state is stored, how it is set, and how the owner ID ultimately gets sent up to `AnnotationActions.jsx`. The [Managing State](https://react.dev/learn/managing-state) page of the React docs may provide helpful insight as to how and why some of this works.

> **Tip:** Store state at the lowest level possible. Each time a state variable is updated, the component it is initated in and thus all sub components re-render. I most frequently pass state variables between components when I need to access or render the state value at a higher level and change the state value at a lower level.

## Notable Dependencies

-   [wouter](https://github.com/molefrog/wouter): Lightweight routing
-   [protobuf-ts](https://github.com/timostamm/protobuf-ts/blob/main/README.md): Generates proto stubs with ECMAScript-style imports.
-   [ag-grid-react](https://www.ag-grid.com/react-data-grid/getting-started/): Data grid library for displaying result data
-   [floating-ui](https://floating-ui.com/docs/react): Positioning for floating elements; used for pop-up menus and forms
-   [radix-ui](https://www.radix-ui.com/): Component library used in some [shadcn/ui](https://ui.shadcn.com/) components
-   [vitest](https://vitest.dev/): Vite-native testing framework. Testing coverage is very poor at this point.

## Todo List

-   Enhance data set and annotation api calls and front end to include other parameters
-   Make sure DataPlatformApi logic aligns with logic in calling files (comments are called comments, names called names, etc)
-   Flesh out and style data set display page
-   Restructure url to allow user to visit a specific query
-   Develop tabbing mechanism to allow users to have multiple queries or data set pages within one page
-   Add user accounts
