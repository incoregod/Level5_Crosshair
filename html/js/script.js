const $closeBtn = $("#close-bttn");
const $turnOnButton = $("#turnOn");
const $turnOffButton = $('#turnOff')
const $crosshair = $("#crosshair");

window.addEventListener("message", function (event) {
  switch (event.data.action) {
    case "openUI":
      $("#app").fadeIn();
      case "openUI":
        const $colorInput = $("#color");
        const $thicknessInput = $("#thickness");
        const $lengthInput = $("#length");
        const $gapInput = $("#gap");
        const $opacityInput = $("#opacity");
        const $outlineInput = $("#outline");
        const $outlineColorInput = $("#outline-color");
        const $applyButton = $("#apply");
        const $resetButton = $("#reset");
        const $dotCheckbox = $("#dot");
        const $dotSizeInput = $("#dot-size");
  
        function loadCrosshairSettings() {
          const settings = JSON.parse(localStorage.getItem("crosshairSettings"));
          if (settings) {
            $colorInput.val(settings.color);
            $thicknessInput.val(settings.thickness);
            $lengthInput.val(settings.length);
            $gapInput.val(settings.gap);
            $opacityInput.val(settings.opacity);
            $outlineInput.val(settings.outlineThickness);
            $outlineColorInput.val(settings.outlineColor);
            $dotCheckbox.prop("checked", settings.showDot);
            $dotSizeInput.val(settings.dotSize);
          }
        }
  
        function saveCrosshairSettings() {
          const settings = {
            color: $colorInput.val(),
            thickness: $thicknessInput.val(),
            length: $lengthInput.val(),
            gap: $gapInput.val(),
            opacity: $opacityInput.val(),
            outlineThickness: $outlineInput.val(),
            outlineColor: $outlineColorInput.val(),
            showDot: $dotCheckbox.is(":checked"),
            dotSize: $dotSizeInput.val(),
          };
          localStorage.setItem("crosshairSettings", JSON.stringify(settings));
        }
  
        function resetCrosshairSettings() {
          const defaultSettings = {
            color: "#00ff00",
            thickness: 2,
            length: 20,
            gap: 10,
            opacity: 1,
            outlineThickness: 0,
            outlineColor: "#000000",
            showDot: false,
            dotSize: 4,
          };
          $colorInput.val(defaultSettings.color);
          $thicknessInput.val(defaultSettings.thickness);
          $lengthInput.val(defaultSettings.length);
          $gapInput.val(defaultSettings.gap);
          $opacityInput.val(defaultSettings.opacity);
          $outlineInput.val(defaultSettings.outlineThickness);
          $outlineColorInput.val(defaultSettings.outlineColor);
          $dotCheckbox.prop("checked", defaultSettings.showDot);
          $dotSizeInput.val(defaultSettings.dotSize);
  
          localStorage.setItem("crosshairSettings", JSON.stringify(defaultSettings));
          updateCrosshair();
        }
  
        function updateCrosshair() {
          const color = $colorInput.val();
          const thickness = $thicknessInput.val() + "px";
          const length = $lengthInput.val() + "px";
          const gap = $gapInput.val() + "px";
          const opacity = $opacityInput.val();
          const outlineThickness = $outlineInput.val() + "px";
          const outlineColor = $outlineColorInput.val();
          const showDot = $dotCheckbox.is(":checked") ? "block" : "none";
          const dotSize = $dotSizeInput.val() + "px";
  
          $crosshair.css({
            "--crosshair-color": color,
            "--crosshair-thickness": thickness,
            "--crosshair-length": length,
            "--crosshair-gap": gap,
            "--crosshair-opacity": opacity,
            "--outline-thickness": outlineThickness,
            "--outline-color": outlineColor,
            "--dot-size": dotSize,
          });
          $crosshair.find(".dot").css({
            display: showDot,
          });
        }
  
        // Event listeners
        $thicknessInput.on("input", updateCrosshair);
        $lengthInput.on("input", updateCrosshair);
        $gapInput.on("input", updateCrosshair);
        $colorInput.on("input", updateCrosshair);
        $opacityInput.on("input", updateCrosshair);
        $outlineInput.on("input", updateCrosshair);
        $outlineColorInput.on("input", updateCrosshair);
        $dotCheckbox.on("change", updateCrosshair);
        $dotSizeInput.on("input", updateCrosshair);
  
        $applyButton.on("click", function () {
          updateCrosshair();
          saveCrosshairSettings();
        });
  
        $resetButton.on("click", function () {
          resetCrosshairSettings();
        });


  
        loadCrosshairSettings();
        updateCrosshair();

      break;
    default:
      break;
  }
});

$closeBtn.on("click", function () {
  $("#app").fadeOut();
  $.post(`https://lvl5_crosshair/close`, JSON.stringify({}));
});

$turnOnButton.change(function() {
  if ($(this).is(':checked')) {
    $('#showCrosshair').fadeIn().append($crosshair);
  } else {
    $('#holder-crosshair').fadeIn().append($crosshair);
  }
});