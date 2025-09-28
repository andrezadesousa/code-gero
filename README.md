<!-- I SWEAR I WILL NOT DELETE ANY OF THE ITEMS BELOW AND WILL FILL THEM CORRECTLY -->

# :scroll: Description

This pull request introduces the initial setup and several enhancements for the Marvel project, including API integration, UI components, and theming.

- Project initialized with Create React App  
- Axios and CryptoJS added for API requests  
- Marvel API integration implemented, including character listing and search functionality  
- Components added: Hero, Header (with dark/light mode), Footer, CharacterGrid, CharacterCard, CharacterModal, Pagination, Skeletons  
- Styled-components used for styling throughout the app  
- Framer Motion added for animations  
- TypeScript typings added for various components and API calls  
- Loading and theme button functionalities implemented  
- Refactor and organize files: styled themes, types, and unused files removed  
- Favicon and image assets added  

## :gear: How to test

1. Run the application locally (`npm start` or `yarn start`).  
2. Verify that the Hero, Header, Footer, and Pagination components render correctly.  
3. Check the character listing and search functionality.  
4. Open a CharacterModal to see detailed character information.  
5. Test dark/light mode toggle in the header.  
6. Confirm that skeleton loaders appear while fetching data.  
7. Validate API calls using Marvel API and ensure data is displayed correctly.  
8. Check the app layout and styling consistency across pages.  


## :notebook: Checklist

- [x] Fill a Title for this PR that explains the source, following the format [`<type>[optional scope]: <description>`](https://www.conventionalcommits.org/). e.g., `feat(marvel-app): initial project setup and character listing`
- [x] I have performed a self-review of my code
- [ ] I have mapped out all the debts that I can't resolve in this PR and linked them here
- [ ] I have added tests that prove my fix is effective or that my feature works
- [x] New and existing unit tests from changed files pass locally with my changes
- [ ] If new environment variables are necessary, they were already added to Production secrets
- [ ] If new tables or table changes are necessary they were already migrated to the Production
