angular.module('futurism')
	.directive('summonAnim', function(_, $, $timeout, animFns) {
		'use strict';


		return {
			restrict: 'A',
			link: function(scope, boardElement) {


				scope.$on('event:smmn', function(srcScope, update) {

					var updatingTargets = animFns.updatedAnimTargets(update);
					var effect;
					var srcPoint;
					var destPoint = {x: 0, y: 0};

					_.each(updatingTargets, function(updatingTarget) {
						var point = animFns.targetCenter(updatingTarget.target, boardElement);
						if(!updatingTarget.target.card) {
							destPoint = point;
						}
						else {
							srcPoint = point;
						}
					});

					if(!srcPoint) {
						srcPoint = destPoint;
					}

					effect = $('<div class="summon-effect"><div class="effect"></div><div class="effect"></div></div>');
					effect.css({left: srcPoint.x, top: srcPoint.y});
					effect.animate({left: destPoint.x, top: destPoint.y});
					boardElement.append(effect);

					$timeout(function() {
						effect.remove();
					}, 2000);
				});


			}
		};
	});