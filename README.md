![Ideal Forms logo](http://i.imgur.com/F9erFXl.png)

The best forms just got better! Ideal Forms 3 is smaller, faster, and more extensible.

**Support:** IE9+ and all modern browsers.  
**Demo:** http://cedricruiz.me/idealforms3

### Major changes since version 2

Ideal Forms 3 is **not** compatible with version 2. You can still find Ideal Forms 2 under [jq-idealforms-old](https://github.com/elclanrs/jq-idealforms-old), but support has been dropped. Here's what's new in version 3:

- New architecture, more modularity
- Custom markup
- Extensions
- Improved custom checkbox, radio and file inputs
- Improved built-in theme
- Switch to Stylus
- Drop custom select menu
- Drop support for IE8

### TODO

- Bring back responsive theme

## Table of Contents

- [Setup](#setup)
- [Options](#options)
- [Markup](#markup)
    - [Custom Markup](#custom-markup)
- [Adding Rules](#adding-rules)
- [Built-in Rules](#built-in-rules)
- [Methods](#methods)
- [Built-in Extensions](#built-in-extensions)
    - [Dynamic Fields](#extension-dynamic-fields)
    - [Steps](#extension:-steps)
    - [Custom Inputs](#extension-custom-inputs)
    - [Ajax](#extension-ajax)
    - [Datepicker](#extension-datepicker)
- [Custom Rules](#custom-rules)
- [Custom Extensions](#custom-extensions)
- [Themes](#themes)
- [FAQ](#faq)
- [Build & Share](#build--share)

## Setup

- Load latest [jQuery](http://code.jquery.com/jquery-2.0.3.min.js) library
- Load `css/jquery.idealforms.css` stylesheet
- Load `js/out/jquery.idealforms.min.js` plugin
- Download images and make sure the [path is correct](#why-the-icons-dont-show-up)
- For better IE support, replace the opening `html` tag with:

```html
<!--[if IE 9]> <html class="ie9" lang="en"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
```

- Call Ideal Forms on your form:

```javascript
$('form').idealforms({ options });
```

## Options

```javascript
defaults = {
  field: '.field',
  error: '.error',
  iconHtml: '<i/>',
  iconClass: 'icon',
  invalidClass: 'invalid',
  validClass: 'valid',
  silentLoad: true,
  onValidate: $.noop,
  onSubmit: $.noop,
  rules: {}
}
```

### field

The field container for [custom markup](#custom-markup).

### error

The error container for custom markup.

### iconHtml

The element to use as icon. Set to `false` to disable icons.

### iconClass

The class for the icon element.

### invalidClass

The class that will be added to invalid fields.

### validClass

The class that will be added to valid fields.

### silentLoad

Initialize the form silently, otherwise focus the first invalid input.

### onValidate(input, rule, valid)

Callback that runs after an input attempts to validate.

- **input:** The input being validated
- **rule:** The rule that the input is validating.
- **valid:** Boolean. Did it validate?

### onSubmit(invalid, event)

Callback that runs when the form is submitted.

- **invalid:** The number of invalid fields if any.
- **event:** The submit event (prevented by default).

## Markup

You can get started quickly using Ideal Forms' default markup: 

```html
<form class="idealforms" novalidate action="/" method="post">

  <!-- Text -->
  <div class="field">
    <label class="main">Username:</label>
    <input name="username" type="text">
    <span class="error"></span>
  </div>

  <!-- File -->
  <div class="field">
    <label class="main">Picture:</label>
    <input id="picture" name="picture" type="file" multiple>
    <span class="error"></span>
  </div>

  <!-- Radio -->
  <div class="field">
    <label class="main">Sex:</label>
    <p class="group">
      <label><input name="sex" type="radio" value="male">Male</label>
      <label><input name="sex" type="radio" value="female">Female</label>
    </p>
    <span class="error"></span>
  </div>

  <!-- Checkbox -->
  <div class="field">
    <label class="main">Hobbies:</label>
    <p class="group">
      <label><input name="hobbies[]" type="checkbox" value="football">Football</label>
      <label><input name="hobbies[]" type="checkbox" value="basketball">Basketball</label>
      <label><input name="hobbies[]" type="checkbox" value="dancing">Dancing</label>
    </p>
    <span class="error"></span>
  </div>

  <!-- Select -->
  <div class="field">
    <label class="main">Options:</label>
    <select name="options" id="">
      <option value="default">&ndash; Select an option &ndash;</option>
      <option value="1">One</option>
      <option value="2">Two</option>
    </select>
    <span class="error"></span>
  </div>

  <!-- Textarea -->
  <div class="field">
    <label class="main">Comments:</label>
    <textarea name="comments" cols="30" rows="10"></textarea>
    <span class="error"></span>
  </div>
  
  <!-- Button -->
  <button type="submit">Submit</button>
  
</form>
```

### Custom Markup

Ideal Forms 3 has been built from scratch with flexibility in mind. The markup is no longer tied to the plugin. If the default markup doesn't work for you, you can create your own markup. Ideal Forms will look for the following:

- **A field:** A field must contain at least a label, an input and an error.
- **A label:** The label to identify the field.
- **An input or group of inputs:** Must be a single input or multiple related inputs such as checkboxes or radios. A field _cannot_ contain inputs with different `name` attributes; this is a limitation by design.
- **An error container:** An element to hold the error.

Then you have to tell Ideal Forms that you want to use custom markup. You can specify these options when initializing the plugin:

```javascript
$('form').idealforms({
  field: '.myfield', // selector
  error: '.myerror', // selector
  validClass: 'myvalid', // class name
  invalidClass: 'myinvalid' // class name
});
```

## Adding Rules

Pass an object to the `rules` option, where each key corresponds to a `name` attribute and each value is a string of rules assigned to that input. Always quote keys for consistency:

```javascript
$('form').idealforms({
  rules: {
    'username': 'required username',
    'password': 'required password',
    'sex': 'minoption:1',
    'hobbies[]': 'minoption:1 maxoption:2',
    'options': 'select:default'
  }
});
```

You can also add rules after initializing the plugin:

```javascript
$('form').idealforms('addRules', {
  'comments': 'required minmax:50:200'
});
```

## Built-in Rules

A rule must be in this format `rule:param` where `rule` is the name of the `rule` and `param` is a rule parameter, for example `minmax:10:50` will use the `minmax` rule with two arguments, `10` and `50`.

- **required:** The field is required. Only works with text inputs.
- **digits:** Only digits.
- **number:** Must be a number.
- **username:** Must be between 4 and 32 characters long and start with a letter. You may use letters, numbers, underscores, and one dot.
- **email:** Must be a valid email.
- **pass:** Must be at least 6 characters long, and contain at least one number, one uppercase and one lowercase letter.
- **strongpass:** Must be at least 8 characters long and contain at least one uppercase and one lowercase letter and one number or special character.
- **phone:** Must be a valid US phone number.
- **zip:** Must be a valid US zip code
- **url:** Must be a valid URL.
- **range:min:max:** Must be a number between `min` and `max`. Usually combined with `number` or `digits`.
- **min:min:** Must be at least `min` characters long.
- **max:max:** Must be no more that `max` characters long.
- **minmax:min:max:** Must be between `min` and `max` characters long.
- **minoption:min:** Must have at least `min` checkboxes or radios selected.
- **maxoption:max:** Must have no more than `max` checkboxes or radios selected.
- **select:default:** Make a select required, where `default` is the value of the default option.
- **extension:ext:** Validates file inputs. You can have as many `ext` as you want.
- **equalto:name:** Must be equal to another field where `name` is the name of the field.
- **ajax:** See the built-in [Ajax Extension](#ajax).

## Methods

To call a method run `idealforms` on the form and pass the method and arguments:

```javascript
$('form').idealforms('method', arg1, arg2, ...);
```

### .idealforms('addRules', rules)
  
See [Adding Rules](#adding-rules)

### .idealforms('get:invalid')

Returns a jQuery collection of all invalid fields. Access the `length` to check how many fields are invalid.

### .idealforms('focusFirstInvalid')

Focus the first invalid field.

### .idealforms('is:valid', name)

Check if the input with `name` attribute is valid.

### .idealforms('reset')

Reset all onputs to zero. That means emptying all the values of text inputs, unchecking all checkboxes and radios, and reverting selects to their default option.

## Built-in Extensions

Ideal Forms 3 has been re-designed to be able to extend the core easily. Read on [Custom Extensions](#custom-extensions) to learn more.

Ideal Forms comes with a few built-in extensions. Extensions can be disabled with the `disabledExtensions` option by passing a space separated string of extensions.

```javascript
$('form').idealforms({
  disabledExtensions: 'dynamicFields steps customInputs ajax'
});
```

### Extension: Dynamic Fields

Dynamic Fields extends core with the following methods:

#### .idealforms('addFields', fields)

Add fields to the form.

- **fields:** And object where each key corresponds to the `name` attribute. The value of the object is another object that can contain any of the following options (* are required):

```javascript
{
  type*: 'text:subtype | file | group:subtype | select',
  label*: 'Label',
  value: 'value',
  attrs: 'attr="value"',
  after: 'name',
  before: 'name',
  list: [
    { value: 'value', text: 'text' }
    ...
  ],
  rules: 'rule rule rule'
}
```

Text subtypes include all HMTL5 text types, such as `email`, `number`, etc...

Group subtypes include `radio` and `checkbox`.

If `before` or `after` are not set, the field will be added at the end of the form.

**Example:**

```javascript
$('form').idealforms('addFields', {
  'fruits[]': {
    type: 'group:checkbox',
    label: 'Fruits',
    list: [
      { value: 'apple', text: 'Apple', attrs: 'checked' },
      { value: 'orange', text: 'Orange' },
      { value: 'banana', text: 'Banana' }
    ],
    rules: 'minoption:1 maxoption:2'
  }
});
```

The HTML is generated according to built-in templates. If you're using your own custom markup you may need custom templates. Ideal Forms provides a simple templating system to easy the pain. These are the default templates that you may change in the options when calling the plugin. They are listed as real HTML for convenience but you must pass a string in the options (you can get the HTML from a script tag for example):

```html
<!-- Base -->
<div class="field" {class}>
  <label class="main">{label}</label>
  {field}
  <span class="error"></span>
</div>

<!-- Text -->
<input name="{name}" type="{subtype}" value="{value}" {attrs}>

<!-- File -->
<input id="{name} "name="{name}" type="file" value="{value}" {attrs}>

<!-- Textarea -->
<textarea name="{name}" {attrs}>{text}</textarea>

<!-- Group -->
<p class="group">
  {@list}
  <label><input name="{name}" type="{subtype}" value="{#value}" {#attrs}>{#text}</label>
  {/list}
</p>

<!-- Select -->
<select name={name}>
  {@list}
  <option value="{#value}">{#text}</option>
  {/list}
</select>
```

```javascript
$('form').idealforms('templates', {

  templates: {
    base: '...',
    text: '...',
    file: '...',
    textarea: '...',
    group: '...',
    select: '...'
  }
});
```

The templating rules are:

- **{var}:** A variable or property.
- **{@list} html {/list}:** A loop.
- **{#var}:** A loop variable (inside the loop).

#### .idealforms('removeFields', names)

Remove fields from the form.

- **names:** A space separated string of `name` attributes.

**Example:**

```javascript
$('form').idealforms('removeFields', 'username password hobbies[]');
```

#### .idealforms('toggleFields', names)

Show or hide fields. When the fields are hidden they will be excluded from the validation.

- **names:** A space separated string of `name` attributes.

**Example:**

```javascript
$('form').idealforms('toggleFields', 'username password hobbies[]');
```

### Extension: Steps  

Steps let you organize your form in sections. Steps expects a container, navigation, wrapper, and at least one step. Using the default  options you may build your form like so:

```html
<div class="idealsteps-container">

  <nav class="idealsteps-nav"></nav>
  
  <form>
  
    <div class="idealsteps-wrap">
    
      <!-- Step 1 -->
      <section class="idealsteps-step">
        <!-- Form fields -->
      </section>
      
      <!-- Step 2 -->
      <section class="idealsteps-step">
        <!-- Form fields -->
      </section>
           
      <!-- Step 3 -->
      <section class="idealsteps-step">
        <!-- Form fields -->
      </section>
    
    </div>
  
  </form>
  
</div>
```

Steps adds the following options to Ideal Forms:

```javascript
{
  stepsContainer: 'idealsteps-container', // the main container
  stepsOptions: { // the options for the Steps extension
    nav: '.idealsteps-nav',
    navItems: 'li',
    // Build nav items as "Step 1", "Step 2"... automatically
    // Set to `false` to use your own custom markup
    buildNavItems: true,
    wrap: '.idealsteps-wrap',
    step: '.idealsteps-step',
    activeClass: 'idealsteps-step-active',
    before: null, // runs before changing steps
    after: null, // runs after changing steps
    fadeSpeed: 0
  }
}
```

Steps provides these methods:

#### .idealforms('goToStep', index)

Go to the step number `index`. Indices start at `0`.

#### .idealforms('prevStep')

Go to the previous step. It wraps around.

#### .idealforms('nextStep')

Go to the next step. It wraps around.

#### .idealforms('firstStep')

Go to the first step.

#### .idealforms('lastStep')

Go to the last step.

### Extension: Custom Inputs

Adds custom checkboxes, radios and file inputs (yes!) seamlessly. The custom select menu has been dropped from Ideal Forms 3; it was proving to be a pain to maintain, and there are much better alternatives, such as [Select2](http://ivaynberg.github.io/select2/) if you need them.

This extension has no additional options or methods.

### Extension: Ajax

Adds an `ajax` rule. First specify a URL on your input:

```html
<input type="text" name="username" data-idealforms-ajax="test-username.php"/>
```

Then add the rule to the field _always_ at last.

```javascript
$('form').idealforms({
  rules: {
    'username': 'required username ajax'
  }
});
```

The ajax filter will read the URL and send a POST request to the server. The server side script must return a JSON encoded `true` (passes validation) or `false` (fails validation). for example in PHP:

```php
<?php
echo json_encode(true);
```

If the response gets delayed the field will switch into "ajax mode" by showing a loading icon until the response comes back.

### Extension: Datepicker

Adds a datepicker to date inputs. You must include [jQuery UI](http://jqueryui.com/) first, then add the class `datepicker` to your date inputs:

```html
<input name="event" type="text" placeholder="mm/dd/yyyy" class="datepicker">
```

Now you can add the `date` rule:

```javascript
$('form').idealforms({
  rules: {
    'event': 'date'
  }
});
```

The default format is `mm/dd/yyyy` for Ideal Forms and `mm/dd/yy` for the jQuery UI datepicker. Note that Ideal Forms represents years with `yyyy` not `yy`, but the formats are interchangeable.

```javascript
$('form').idealforms({
  rules: {
    'event': 'date:yyyy-mm-dd'
  }
});

$('.datepicker').datepicker('option', 'dateFormat', 'yy-mm-dd');
```

## Custom Rules

You can add rules by extending the global `rules` object:

```javascript
$.extend($.idealforms.rules, {

  ruleRegex: /abc/g,
  
  // The rule is added as "ruleFunction:arg1:arg2"
  // @param input {Node}
  ruleFunction: function(input, value, arg1, arg2, ...) {
  
  }
});
```

After you add a rule you must add an error for it, by extending the global `errors` object. Don't forget this step:

```javascript
$.extend($.idealforms.errors, {
  ruleRegex: 'Must be a valid value for this rule',
  ruleFunction: 'Must be a valid value. {0}, {1}'
});
```

If the rule is a function that takes rule parameters pass the parameters as `{0}`, `{1}`, etc. If you want to print all the parameters use `{*}` where the default separator is a comma but you can use your own like `{*~}` where `~` is the custom separator.

## Custom Extensions

```javascript
$.idealforms.addExtension({

  name: 'extensionName',
  
  options: {
    option: 'default'  
  },
  
  methods: {
    
    // @extend
    _init: function() {
    
    },
    
    newMethod: function() {
    
    }
  }
});
```

## Themes

Ideal Forms 3 is using [Stylus](http://learnboost.github.io/stylus/). To create your own theme to use with the default markup open `styl/vars.stly`, modify what you need and [compile](#build--share).

```sass
valid = #3F9DCC // valid font color
valid-bg = #EDF7FC // valid background color
invalid = #CC2A18 // invalid font color
invalid-bg = #FFEDED // invalid background color
ajax = #CFAA19 // ajax font color
ajax-bg = #FAF9E8 // ajax background color
ui-element = #ddd // buttons, select and steps backgruond color
error = #285d85 // error background color

label-width = 120px // main labels width
input-width = 290px // input width applies to all fields
error-width = (input-width/1.5)
radius = 3px // border-radius

icon = true // disable icons (must disable in plugin options too)
group-horizontal = false // group checkbox and radio horizontally
```

## FAQ

### How to access the Ideal Forms plugin instance

Ideal Forms attaches an instance of itself to your form(s). To access the instance (prototype) use `data`:

```javascript
var instance = $('form').data('idealforms');
```

Now you an use methods like so:

```javascript
instance.reset(); // reset the form
```

### Why the icons don't show up

Ideal Forms assumes that your site has this common structure:

```
site
  + css
  + img
  + js
    index.html
```

When you download Ideal Forms, make sure to place the images inside `img`. If your folder structure is different you have to open `css/jquery.idealforms.css` and search and replace `../img/` with the correct path to your images folder relative to the plugin.

## Build & Share

Ideal Forms 3 is built using some popular NodeJS tools. This is what you'll need to install globally:

- [Stylus](https://github.com/learnboost/stylus)
- [UglifyJS](https://github.com/mishoo/UglifyJS2)
- [Browserify](https://github.com/substack/node-browserify)

Then clone the repo, `cd` into the folder and run `npm install` to install dependencies.

Finally run `watch -c sh compile.sh` to watch for changes and compile. Now you're ready to edit files and help make Ideal Forms better, or create your own fork.

If you want to test ajax make sure to run it on your localhost.

**Enjoy ;)**