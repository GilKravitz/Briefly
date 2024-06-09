# Briefly

## Overview

Briefly is an innovative application designed to keep users up-to-date with their topics of interest in a fast and engaging way. By aggregating articles from various websites and summarizing them into concise pieces, Briefly ensures users can stay informed without spending excessive time reading through multiple sources.

## Technologies


- _Web Scraping_: Scrapes articles from N12, N13, and YNET using BeautifulSoup module .
- _Database Integration_: Stores the scraped articles in a PostgreSQL database.
- _Articles Text-Similarity_: Uses OpenAI embeddings model to perform text-similariry between articles,
  in order to reduce redundancy of similar articles collected from different sources.
- _Summarization_: Summarizes articles into a concise articles, by leveraging the hebrew language capabilities of the Gemini language model.
- _Backend Server_: A .NET C# backend server serves all the data needed by the application, utilizing JWT tokens for authenticating users by hashing their credentials.
- _Frontend Application_: Built with TypeScript and React Native, featuring a beautiful UI, user authentication, and personalized content delivery.

## Architecture + Workflow

1. _Scraping_
   - Utilizes three web scrapers to collect articles from N12, N13, and YNET.
   - Scrapes various types of articles including Sports, Politics, Economy, etc.
2. _Data Storage_
   - Collected articles are stored in a PostgreSQL database.
3. _Article Processing_
   - Similar Articles are clustered using OpenAI embedding model and text-similarity techniques.
   - Each cluster of articles is summarized into a few sentences using Gemini, keeping them in Hebrew.
   - Summarized articles are stored back in the PostgreSQL database.
4. _Backend Server_
   - A .NET C# backend server provides necessary endpoints and handles data requests.
   - Uses JWT tokens for user authentication, hashing user credentials to ensure security.
5. _Frontend Application_
   - Built with TypeScript and React Native.
   - Features include user login, registration, password reset, and content preferences.
   - Displays articles based on user preferences and provides links to the original articles.

## Usage

- Users can register and set their content preferences.
- The application will display summarized articles based on the user's interests.
- Users can click on links to read the full original articles if desired.


## Project Documents

### PDF

- [Briefly-Product-Presentation.pdf](./Documents/Briefly-Product-Presentation.pdf)
- [Briefly-Presentation-EN.pdf](./Documents/Briefly-Presentation-EN.pdf)
- [Briefly-Presentation-HE.pdf](./Documents/Briefly-Presentation-HE.pdf)

### PPTX

- [Briefly-Product-Presentation.pptx](./Documents/Briefly-Product-Presentation.pptx)
- [Briefly-Presentation-EN.pptx](./Documents/Briefly-Presentation-EN.pptx)
- [Briefly-Presentation-HE.pptx](./Documents/Briefly-Presentation-HE.pptx)

---

With Briefly, stay informed effortlessly with concise and relevant summaries of your favorite topics.
