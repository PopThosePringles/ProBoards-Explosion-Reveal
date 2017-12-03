"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Explosion_Reveal = function () {
	function Explosion_Reveal() {
		_classCallCheck(this, Explosion_Reveal);
	}

	_createClass(Explosion_Reveal, null, [{
		key: "init",
		value: function init() {
			this.PLUGIN_ID = "image_explosion_reveal";
			this.settings = Object.create(null);
			this.explosion_spritesheet = "";

			this.setup();

			if (this.settings.gifts && this.settings.gifts.length > 0) {
				$(this.ready.bind(this));
			}
		}
	}, {
		key: "setup",
		value: function setup() {
			var plugin = pb.plugin.get(this.PLUGIN_ID);

			if (plugin && plugin.settings) {
				this.settings = plugin.settings;

				this.explosion_spritesheet = plugin.images.spritesheet;
			}
		}
	}, {
		key: "ready",
		value: function ready() {
			var $content = $("<div class='the-gifts'></div>");
			var total = 0;

			for (var i = 0; i < this.settings.gifts.length; ++i) {
				if (!localStorage.getItem("exp_gift_" + this.settings.gifts[i].unique_key)) {
					$content.append("<div><img src='" + this.settings.gifts[i].before_image + "' data-after-image='" + this.settings.gifts[i].after_image + "' data-key='" + this.settings.gifts[i].unique_key + "' /><div></div></div>");

					total++;
				}
			}

			if (!total) {
				return;
			}

			$content.find("img").on("click", function (e) {

				var $img = $(this);
				var $explosion = $img.parent().find("div");

				$explosion.css({

					top: $img.height() / 2 - 55 + "px",
					left: $img.width() / 2 - 55 + "px"

				});

				$explosion.css("background-image", "url('" + Explosion_Reveal.explosion_spritesheet + "')");
				$explosion.addClass("image-explosion");

				$img.animate({ opacity: 0.01, duration: 1.2 }, {

					complete: function complete() {

						$img.attr("src", $img.attr("data-after-image"));
						$img.animate({ opacity: 1 });
						$img.off("click");

						setTimeout($explosion.remove, 750);

						localStorage.setItem("exp_gift_" + $img.attr("data-key"), 1);
					}

				}).delay(0.3);
			});

			this.container({ title: "Gifts", content: $content }).prependTo("#content");
		}
	}, {
		key: "container",
		value: function container() {
			var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
			    _ref$title = _ref.title,
			    title = _ref$title === undefined ? "" : _ref$title,
			    _ref$content = _ref.content,
			    content = _ref$content === undefined ? "" : _ref$content;

			var html = "";

			html += "<div class=\"container\">";
			html += "<div class=\"title-bar\"><h2>" + title + "</h2></div>";
			html += "<div class=\"content pad-all\"></div>";
			html += "</div>";

			var $html = $(html);

			$html.find(".content").append(content);

			return $html;
		}
	}]);

	return Explosion_Reveal;
}();

Explosion_Reveal.init();