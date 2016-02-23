document.addEventListener('DOMContentLoaded', function() {
  //console.log('DOM loaded: simple-sidebar');
  sidebar.init();
});

var sidebar = (function() {
	function init() {
		wrapper = document.querySelector("#wrapper");
		sidebar = document.querySelector("#sidebar-wrapper");

		slideOptions = document.querySelector(".slideOptions");

		slideOptions.addEventListener("click", function (e) {
			if(slide.className === "btn btn-default btn-sq-lg btn-xl hidden-xs toggled") {
				slide.className = "btn btn-default btn-sq-lg btn-xl hidden-xs";
				slide.textContent = ">";
				wrapper.className = "";
			}
			else {
				slide.className += " toggled";
				slide.textContent = "<";
				wrapper.className = "toggled";
			}

		});


		//sidebar.addEventListener("click", function (e) {
    //  		if(wrapper.className === "toggled") {
    //  			wrapper.className = "";
    //  		}
    //  		else {
    //  			wrapper.className = "toggled";
    //  		}
    //
    //});

		slide = document.querySelector("#slide");
		iclass = document.querySelector("#iclass");

		slide.addEventListener("click", function (e) {
			if(slide.className === "btn btn-default btn-sq-lg btn-xl hidden-xs toggled") {
				slide.className = "btn btn-default btn-sq-lg btn-xl hidden-xs";
				slide.textContent = ">";
				wrapper.className = "";
			}
			else {
				slide.className += " toggled";
				slide.textContent = "<";
				wrapper.className = "toggled";
			}

		});
	}

	 return {
    init: init,
  };
})();