var App = function() {
  
  var _skyblue = new Skyblue();
  
  function init(category) {
    appendColors(category);
    appendCategories();
    attachEvents();
  }
  
  function appendColors(category) {
    var colors   = _skyblue.getColorsByCategory(category);
    var fragment = document.createDocumentFragment();

    for (var i = 0, length = colors.length; i < length; i++) {
      var div = createColorElement(colors[i]);
      fragment.appendChild(div);
    }

    document.getElementById("colors").innerHTML = "";
    document.getElementById("colors").appendChild(fragment);
  }

  function createColorElement(color) {
    var div = document.createElement("div");
  
    div.className        = "color";
    div.style.background = "rgb(" + color.values.join(',') + ")";
    div.dataset.name     = color.name;
    div.dataset.r        = color.values[0];
    div.dataset.g        = color.values[1];
    div.dataset.b        = color.values[2];
  
    return div;
  }
  
  function appendCategories() {
    var categories = _skyblue.getCategories();
    var fragment   = document.createDocumentFragment();
    
    for (var i = 0, length = categories.length; i < length; i++) {
      var option = createOptionElement(categories[i]);
      fragment.appendChild(option);
    }
    
    document.getElementById("categories").appendChild(fragment);
  }
  
  function createOptionElement(text) {
    var option = document.createElement("option");
    option.text = text;
    return option;
  }

  function attachEvents() {
    var clicked = false;
    
    $(document).delegate(".color", "mouseenter", function(e) {
      var name = this.dataset.name;
      setColor(name);
      clicked = false;
    });
    
    $(document).delegate(".color", "click", function(e) {
      var name = this.dataset.name;
      var r    = this.dataset.r;
      var g    = this.dataset.g;
      var b    = this.dataset.b;
      setColor(clicked ? name : [r, g, b].join(', '));
      clicked = !clicked;
    });
    
    $(document).delegate("#categories", "change", function() {
      var category = this.value.toLowerCase();
      appendColors(category);
    });
  }

  function setColor(name) {
    $("#color").text(name).css({
      "border-bottom-color": name,
    });
  }

  this.init = init;
};