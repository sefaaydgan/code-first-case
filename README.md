# Vite React App with TypeScript, Redux, and Sass

This project is a **React** application created using **Vite**, **TypeScript**, **React-Redux**, and **Redux Toolkit** for state management. The application utilizes **Sass** for styling.

To clone the project: 
```bash
   git clone https://github.com/sefaaydgan/code-first-case.git
```

Then go to your folder and run

```bash
  cd table_codef
```

To install all dependencies, run:

```bash
  npm install
```

After the installation, run this to start the development server:
```bash
  npm run dev
```

Visit http://localhost:5173 to view my app.

## About project

I divided the project into 2 subdirectories using React Router. The first one is the landing page. On this page, there is a table where I fetch the data of all movies and implement pagination. In this case, as requested, there is an input for searching by movie names, a second input for filtering by year, and a select input listing the available genres for searching. Additionally, loading and no result screens have been added to the table.

When clicking on any movie in the table, it redirects to the movie's detail page. On the detail page, all details related to the movie are listed. A button is also added to redirect back to the main page.

In the case, since it was requested to search for "Pokemon" by default, I wrote a custom hook to initially set the search parameter. This hook both updates the URL and sends a request using the search parameter.

Then, I deployed my project to Vercel.

[My Project on Vercel](https://code-first-case.vercel.app)

### Contact

If you encounter any issues, please feel free to contact me via [LinkedIn](https://www.linkedin.com/messaging/compose/?recipient=sefaaydogan) or send a mail to `sefaydogan@outlook.com`

