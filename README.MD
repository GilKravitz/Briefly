# Briefly

## Overview

Briefly is an innovative application designed to keep users up-to-date with their topics of interest in a fast and engaging way. By aggregating articles from various websites and summarizing them into concise pieces, Briefly ensures users can stay informed without spending excessive time reading through multiple sources.

## Technologies

- *Web Scraping*: Scrapes articles from N12, N13, and YNET using BeautifulSoup module .
- *Database Integration*: Stores the scraped articles in a PostgreSQL database.
- *Articles Text-Similarity*: Uses OpenAI embeddings model to perform text-similariry between articles,
  in order to reduce redundancy of similar articles collected from different sources.
- *Summarization*: Summarizes articles into a concise articles, by leveraging the hebrew language capabilities of the Gemini language model.
- *Backend Server*: A .NET C# backend server serves all the data needed by the application, utilizing JWT tokens for authenticating users by hashing their credentials.
- *Frontend Application*: Built with TypeScript and React Native, featuring a beautiful UI, user authentication, and personalized content delivery.

## Architecture + Workflow

1. *Scraping*
   - Utilizes three web scrapers to collect articles from N12, N13, and YNET.
   - Scrapes various types of articles including Sports, Politics, Economy, etc.
2. *Data Storage*
   - Collected articles are stored in a PostgreSQL database.
3. *Article Processing*
   - Similar Articles are clustered using OpenAI embedding model and text-similarity techniques.
   - Each cluster of articles is summarized into a few sentences using Gemini, keeping them in Hebrew.
   - Summarized articles are stored back in the PostgreSQL database.
4. *Backend Server*
   - A .NET C# backend server provides necessary endpoints and handles data requests.
   - Uses JWT tokens for user authentication, hashing user credentials to ensure security.
5. *Frontend Application*
   - Built with TypeScript and React Native.
   - Features include user login, registration, password reset, and content preferences.
   - Displays articles based on user preferences and provides links to the original articles.

## Usage

- Users can register and set their content preferences.
- The application will display summarized articles based on the user's interests.
- Users can click on links to read the full original articles if desired.

---

With Briefly, stay informed effortlessly with concise and relevant summaries of your favorite topics.