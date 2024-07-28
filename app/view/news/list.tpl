<!DOCTYPE html>
<html>
  <head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" type="text/css" />
  </head>
  <body>
    <h1><a href="/news">Hacker News</a></h1>
    <ul class="news-view view v-transition">
      {% for item in list %}
        <li class="item">
          <a href="{{ item.url }}">{{ item.title }}</a>
        </li>
      {% endfor %}

      <div class="nav">
        {% if page > 1 %}
            <a href="/news?page={{ page - 1 }}">&lt; prev</a>
        {% endif %}
            <a href="/news?page={{ page + 1 }}">more...</a>
      </div>
    </ul>
  </body>
</html>