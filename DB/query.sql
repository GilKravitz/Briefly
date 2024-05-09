UPDATE merged_articles
SET article = REPLACE(article, '**היום ה-215 למלחמה:**', '')
WHERE article LIKE '%**היום ה-215 למלחמה:**%';
