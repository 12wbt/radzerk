Google Tag Manager (GTM) Configuration
======================================

This group of tags and macros represents the engine room of Radzerk.

Radzerk Ads
-----------

In GTM add a new macro called 'Radzerk Ads'. N.B. the name is important, if it is not capitalised, spelt correctly it will not work.

Use `gtm-macro-radzerk-ads.js` as a template for a matrix of ads which will be referenced in the configuration.

```javascript
'ad-slug': {
  start: '2014-07-20T07:48:42+00:00',
  end: '2014-07-30T07:48:42+00:00',
  priority: 1,
  link: 'http://shop.12wbt.com',
  new_window: true,
  keywords: ['AU'],
  sizes: {
    'medium-rectangle':  'https://s3.amazonaws.com/radzerk/ad-slug-1-mrec.png',
    'large-leaderboard': 'https://s3.amazonaws.com/radzerk/ad-slug-1-banner.png'
  }
},
...
```

Parameter | Data type | Default | Description
:-------- | :-------- | :------: | :----------
start | String (ISO 8601 formatted date) | null | The date the ad should start. A null value means the ad starts now.
end | String (ISO 8601 formatted date) | null | The date the ad should expire. A null value means the ad will show indefinitely.
priority | Integer | 1 | If a zone's size has more than one ad definition it will choose the ad with a lower priority. If two ad definitions have the same priority one will be chosen at random.
link | URL | null | Where the ad should link to. Null will result in an empty link.
new_window | Boolean | false | Should the ad's link open in a new window.
keywords | Array | null | Only show this ad if these keywords are fulfilled.
sizes | Object | {} | Size to image matrix

Radzerk Config
--------------

Here is where you can configure which ads are associated with each zone.

In GTM add a new macro called 'Radzerk Config'. N.B. the name is important, if it is not capitalised, spelt correctly it will not work.

```javascript
zones: {
  'zone-a': {
    'medium-rectangle': 'ad-slug-1'
  },
  'zone-b': {
    'large-leaderboard': ['ad-slug-1', 'ad-slug-2']
  },
  ...
}
```

`'zone-a'` defines a that the medium-rectangle size should use 'ad-slug-1'. Going by the ad definition in the previous section, this will use `https://s3.amazonaws.com/radzerk/ad-slug-1-mrec.png` as the ad.
`'zone-b'` defines an array of ad slugs to use. This means that it will choose the ad which isn't expired with priority.
