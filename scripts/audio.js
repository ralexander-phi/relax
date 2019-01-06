
(function() {
    var AudioCtx = (window.AudioContext || window.webkitAudioContext)
    var audioCtx = new AudioCtx()

    var lastOut = 0.0
    brown = audioCtx.createScriptProcessor(0, 1, 1);
    brown.onaudioprocess = function(e) {
        var output = e.outputBuffer.getChannelData(0);
        for (var i = 0; i < output.length; i++) {
            var skew = Math.random() * 2 - 1;
            // Each will be up to +/-2% different from the neighbot
            output[i] = (0.98 * lastOut) + (0.02 * skew)
            lastOut = output[i];
        }
    }

    brown.connect(audioCtx.destination);
})();

