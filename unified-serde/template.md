---
:liquid # {{ frontMatter.title }}:

:liquid{{ frontMatter.author }}:

> This is a blockquote!

---

  <p>Color: {{color}}</p>
  
***

:liquid[{{ color  }}]

# Headings

:::liquid-for
{% for i in (1..6) %}
{{ '#' | repeat: i }} h{{i}} Heading
{% endfor %}
:::

Some other text in between

:::liquid-if
{% if color == "blue" %}
  The color blue is awesome!
{% elsif color == "red" %}
  The color red sucks!
{% else %}
  The color {{color}} is ok, ...I guess.
{% endif %}
:::

## Horizontal Rules

Some other text in between

---
