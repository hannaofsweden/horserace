## Getting Started

Install and run the development server:

```bash
git clone https://github.com/hannaofsweden/horserace.git
cd horserace
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Implementation notes

-   The app is generated using Next.js, a framework similar to create-react-app. It doesn't have the concept of ejection mentioned in the the task description. Instead, configuration can be changed in the next.config.js file.
-   The app uses Ant Design as the UI component library.
-   Since styling wasn't mentioned in the task description, I've only applied the most basic styling.
-   I noticed that not all races have a name specified. In those cases, I show the track name instead.
