# Vacation Calendar Dashboard

A simple React application that displays public holidays for any country in a calendar format.

## Features

- Welcome message and country selection
- Fetch public holidays from Calendarific API
- Calendar grid view with weeks and days
- Color-coded rows based on holiday count:
  - Light green: 1 holiday in the week
  - Dark green: Multiple holidays in the week
- Holiday names displayed on respective days
- Simple, clean design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Enter a 2-letter country code (e.g., US, IN, GB)
2. Select view type (Monthly or Quarterly)
3. Click "Show Calendar" to fetch and display holidays
4. Navigate between months using the Previous/Next buttons

## API

This application uses the Calendarific API to fetch public holidays:
- API Key: mzs6Nc3dwG5OJYaTpsb0IoPSS4GiiQK6
- Endpoint: https://calendarific.com/api/v2/holidays

## Built With

- React 18
- CSS3
- Calendarific API
