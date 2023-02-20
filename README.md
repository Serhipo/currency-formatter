# Currency Converter

Simple currency converter. 
Includes two pages:__

- Exchange list
- Converter

## Screencast

- Screencast schowcasing app: https://drive.google.com/file/d/1JQPq9LvlRPcDmXWO5SIb1mlZuz35i6_M/view?usp=share_link
- You can find deployed version at: https://currency-formatter.vercel.app/

## Presequences

- Specify env variables for CurrencyAPI

  - REACT_APP_CURRENCY_API_URL
  - REACT_APP_CURRENCY_API_KEY

- OR

- Specify env variables for docker for CurrencyAPI
  - REACT_APP_CURRENCY_API_URL
  - REACT_APP_CURRENCY_API_KEY

## Run project

### React scripts:

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Docker:

In the project directory, you can run:

### `docker compose up --build`

## Linting

- `yarn lint` - checks for eslint, prettier, and TS errors
- `yarn lint:js` - runs eslint check
- `yarn lint:types` - runs types check

## Technical stack

- React
- React-router
- React-hook-form
- Material UI
- Styled-components
- React-toastify
- Typescript

CI/CD pipeline automatically runs linter checks on push
