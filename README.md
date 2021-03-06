# Release Notes generator
Simple Node.js script to generate an automatic release note based on the MR's merged since the last release.

## How this works?

The operation is basic, the MergeRequest integrated in the Develop branch are obtained in a date range:
    
- Initial date: obtained from the last Tag created.
- End date: current date.

That's it, simple as that.

## Things to keep in mind

When downloading the project, you will need to perform the following steps:
    
- Execute the following command in the terminator (pointing to the project folder):
    
```npm install```

- Create in the root of the project a file called ```.env``` where you must integrate the following parameters:

```
GITLAB_TOKEN=<GITLAB_PERSONAL_ACCESS_TOKEN>
PROJECT_ID=<GITLAB_PROJECT_ID>
TASK_BROWSER=<YOUR_TASK_PRIJECT_URL> (Jira for example)
TARGET_BRANCH=<TARGET_BRANCH_TO_OBTAIN_MERGE_REQUEST>
```

- Finally, we execute the project:
    
```npm start```

The final result will be a text with the following format:

```txt
### [<MERGE_REQUEST_TITLE>](<TASK_URL>)
    MergeRequest: <MERGE_REQUEST_URL>
    Author: <MERGE_REQUEST_AUTHOR>
    Reviewer: <MERGE_REQUEST_REVIEWER>
    ...
    Reviewer: <MERGE_REQUEST_REVIEWER>

```
