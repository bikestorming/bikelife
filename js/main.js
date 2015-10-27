var live = '389d0f42-515a-11e5-95df-0e018d66dc29';
var interactive = '780e12a2-5164-11e5-8303-0e9d821ea90d';
var initialViz = 'interactive';
var currentViz = initialViz;

window.addEventListener("load", init);

function init() {
    cartodb.createVis('map-interactive', 'https://bikestorming.cartodb.com/u/bkx/api/v2/viz/' + interactive + '/viz.json', {
        zoomControl: false,
        fullscreen: false,
        loaderControl: false,
        detectRetina: true
    }).done(function(vis, layers) {

    });
    cartodb.createVis('map-live', 'https://bikestorming.cartodb.com/u/bkx/api/v2/viz/' + live + '/viz.json', {
        zoomControl: false,
        fullscreen: false,
        loaderControl: false,
        detectRetina: true
    }).done(function(vis, layers) {

    });

    $('[data-id=' + initialViz + ']')[0].classList.add('on');

    $('[data-id=live]')[0].addEventListener('click', function() {
        if (currentViz == 'live') return false;

        currentViz = 'live';
        switchToMap('live', live);
        toggleOnStatus();
        $('#bk-selected-map').html('ANIMATED');
    })
    $('[data-id=interactive]')[0].addEventListener('click', function() {
        if (currentViz == 'interactive') return false;

        currentViz = 'interactive';
        switchToMap('interactive', interactive);
        toggleOnStatus();
        $('#bk-selected-map').html('INTERACTIVE');
    })
}

function toggleOnStatus() {
    $('[data-id=interactive]')[0].classList.toggle("on");
    $('[data-id=live]')[0].classList.toggle("on");
}

function switchToMap(mapId, vizId) {
    $('#map-' + mapId).fadeIn(500);
    if (mapId == 'live') {
        $('#map-interactive').fadeOut(500);
    } else {
        $('#map-live').fadeOut(500);
    }
    cartodb.createVis('map-' + mapId, 'https://bikestorming.cartodb.com/u/bkx/api/v2/viz/' + vizId + '/viz.json').done(function(vis, layers) {

    });
}
