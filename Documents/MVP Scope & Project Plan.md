##### TL;DR
###### MVP Scope & Project Plan
### Product Concept 
Our product is a news platform that provides concise summaries of breaking news from multiple sources. Users can easily access news highlights in short snippets, making it a user-friendly and time-efficient way to stay informed without the need for extensive reading or navigation. Our aim is to offer a seamless news consumption experience that keeps users up-to-date with the latest news.

### MVP Scope :
- [ ] Stay updated in less time by subscribing to a news feed that offers brief summaries of news and articles from three different sources.
- [ ] Users can choose from four different categories and create a news feed that is tailor-made for them. This way, users can stay informed on the topics that matter most to them.
- [ ] Users can report about harmful or inaccurate information that they encounter by reading our  concise articles summaries , for help reduce toxicity content and prevent the spread of fake news.

## Project Plan
![Screenshot](./MVP%20Scope%20%26%20Project%20Plan.png)
**Note:** The timeline is approximate and may be adjusted based on project progress and unforeseen challenges.

---
---

### Proposal – Description and basic design
1. **Design UI/UX & Mobile App Development:**
	- [ ] Design wireframes and user flow.
	- [ ] Splash screen & Logo.
	- [ ] User authentication screen (Google Login, Apple Login, Facebook Login).
	- [ ] Articles grid/list screen.
	- [ ] Selected-Article info screen.

2. **Backend Development:**
	- [ ] Design a scalable backend architecture.
	- [ ] Set up databases, server infrastructure, and API endpoints.
	- [ ] Implement user authentication, authorization, and data storage.

3. **Scrapers Development:**
	- [ ] Design a scalable architecture.
	- [ ] Develop web scrapers for data extraction from 3 news websites.
	- [ ] Implement scheduled scraping tasks - twice a day.

4. **Integrations with OpenAI and NLP Models:**
	- [ ] Integrate OpenAI's embeddings API to cluster similar articles using a text-similarity algorithm.
	- [ ] Integrate the OpenAI GPT model to summarize and merge a cluster of similar articles into one concise article. 
	- [ ] Test and optimize prompts and text-similarity performance for accurate results.


---
---

## Project Deliverables:
- [ ] Design Mockups and Prototypes
- [ ] Mobile App (iOS/Android)
- [ ] Backend Infrastructure
- [ ] Web Scrapers
- [ ] OpenAI and NLP Integrations
- [ ] Comprehensive Testing Reports
- [ ] Deployment Documentation

### Main Features:

1. **Authentication Screen:**
	- [ ] Implement user authentication with Google and Facebook login options.
	- [ ] Streamline the onboarding process for a seamless user experience.

2. **Article List/Grid Screen:**
	- [ ] Design a visually appealing grid or list layout for displaying article headlines and a main thumbnail (\*note the main thumbnail is optional).
	- [ ] Include a search bar for easy navigation and quick access to specific content.
	- [ ] Include a search icon for easy navigation and quick access to saved articles.
	- [ ] Implement responsive design for optimal viewing on various devices.
	- [ ] Each item in the list or grid will lead to a more detailed screen about the selected article.
	- [ ] The scrolling mechanism will support "seamless pagination" articles fetching from the API. When the user scrolls to the end of the list, it will trigger an API call to get older articles. 
	- [ ] MVP will only support four categories of articles.

3. **Filter Favorite Topics/Tags**:
	- [ ] Users can select multiple topics/tags that are their area of interest.
	- [ ] The selection can be modified (\*note: optional separate screen or component in Article List/Grid screen)
	- [ ] The selection will trigger a filter of the matched articles in the list/grid screen. 
	
4. **Article Detail Screen:**
	- [ ] Create a detailed view of individual article with concise information.
	- [ ] Links to the source articles (\*note: they might be multiple sources)
	- [ ] Options for user interaction, such as sharing, or saving articles:
	   - [ ] Users can share the article via social media (Facebook).
	   - [ ] Users can save the article as a favorite and access it quickly later on the app.
	- [ ] Options for users to submit a report about the selected article: the reports will be visible to the app's team only and will not be exposed to the users.
