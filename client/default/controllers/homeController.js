var LL = LL || {};
LL.Controllers = LL.Controllers || {};

LL.Controllers.home = (function() {

	var _initialised = false;

	function _displayLeagues(resp) {
		APP.leagues = resp.data;
		var data = resp.data;
		var $lgs = $("#home_leagues");
		for (var i=0; i < data.length; i++)
		{
			var rec = data[i];
			// $lgs.append("<button id=\"home_btnLeague" + data[i].leagueID + "\" data-idx=\"" + data[i].leagueID + "\">" + data[i].leagueName + "</button>");
			// $lgs.append("<div class='league'><div class='league-photo-wrapper'><img src='" + APP.imagePath + rec.img + "' border='0' /></div><div>" + rec.leagueName + "</div></div>");
			var $lg = $("<a class='button league' data-idx='" + i + "' />");
			$lg.append("<div class='league-photo-wrapper'><img src='" + APP.imagePath + rec.img + "' border='0' /></div>");
			var $lgData = $("<div class='league-data' />");
			$lgData.append("<div><b>" + rec.leagueName + "</b></div>");
			$lgData.append("<div><b>Sport: </b>" + rec.sportName + "</div>");
			$lgData.append("<div><b>Level: </b>" + rec.leagueLevelName + "</div>");

			$lg.append($lgData);
			$lgs.append($lg);
			// $lgs.append($lg.clone());
		}
		$("#home_leagues .league").click(function(e) {
			e.preventDefault();
			e.stopImmediatePropagation();
			var id = $(this).attr("data-idx");
			LL.Controllers.league.data = APP.leagues[id];
			APP.leagueContext = APP.leagues[id].leagueID;
			APP.navigate("league", true);
		});
	}

	function _init(cb) {
		$(".ll-header a.button").hide();
		if (_initialised)
		{
			cb();
		}
		else
		{
			// Get affiliated leagues
			DAL.getAffiliatedLeagues(function(resp) {
				_displayLeagues(resp);
				cb();
			});
		}
		_initialised = true;
	}

	function _onClose() {
	}

	return {
		init: _init,
		onClose: _onClose
	};
})();
