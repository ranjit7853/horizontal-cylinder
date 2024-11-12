function CalculateVolumes() {
  // Get the input values
  const diameter = parseFloat(document.getElementById("DiaMeter").value);
  const length = parseFloat(document.getElementById("LenMeter").value);
  const Height = parseFloat(document.getElementById("LiquidDep").value);
  const density = parseFloat(document.getElementById("fluiddensity").value);
  // Validate input values
  if (isNaN(diameter) || isNaN(length) || isNaN(Height)) {
    alert("Please enter valid numeric values for all inputs.");
    return;
  }

  if (Height > diameter) {
    alert("Height of Liquid cannot be greater than Diameter.");
    return;
  }
  if (diameter <= 0) {
    alert("Diameter of the tank must be greater than 0.");
    return;
  }

  if (length <= 0) {
    alert("Length of the tank must be greater than 0.");
    return;
  }

  //start Calculating

  const r = diameter / 2;
  const Volumeoftank = (22 / 7) * r ** 2 * length; // Cm
  const VolumeTankbarrel = Volumeoftank * 8.3864; //US barrel

  // calculate volume of liquid in Cu M
  const LiquidAreaPart1 = r ** 2 * Math.acos((r - Height) / r);
  const LiquidAreaPart2 = (r - Height) * (2 * r * Height - Height ** 2) ** 0.5;
  const LiquidArea = LiquidAreaPart1 - LiquidAreaPart2;
  const LiquidVolume = LiquidArea * length; //volume of liquid in Cu Me
  const LiquidVolumeBbl = LiquidVolume * 8.3864; //us barrel

  //% of tank volume filled
  const VolumeLiquidtoFill = Volumeoftank - LiquidVolume; //vol required to fill completely
  const VolumeLiquidtoFillbbl = VolumeTankbarrel - LiquidVolumeBbl;

  const LiquidVolumePercent = (LiquidVolume / Volumeoftank) * 100;
  const EmptyVolumePercent = 100 - LiquidVolumePercent;

  const LiquidVolWtKg = LiquidVolume * 1000 * density; //weight in kgs
  const LiquidVolWtlbs = (LiquidVolWtKg * 1) / 0.453; // wt in lbs

  document.getElementById("result").innerHTML = `
    <strong>Capacity of the Tank: ${Volumeoftank.toFixed(
      1
    )} Cu.Meter</strong><br>
    <strong>Capacity of the Tank: ${VolumeTankbarrel.toFixed(
      1
    )} Barrels</strong><br>
    <strong>Volume of the Liquid Present: ${LiquidVolume.toFixed(
      1
    )} Cu.Meter</strong><br>
    <strong>Volume of the Liquid Present: ${LiquidVolumeBbl.toFixed(
      1
    )} Barrels</strong><br>
    <strong>Weight of the fluid Presnt: ${LiquidVolWtKg.toFixed(
      1
    )} Kgs</strong><br>
    <strong>Weight of the fluid Presnt: ${LiquidVolWtlbs.toFixed(
      1
    )} Pounds</strong><br>
    <strong>Volume Filled With Fluid: ${LiquidVolumePercent.toFixed(
      1
    )} %</strong><br>
    <strong>Volume of Empty Portion: ${EmptyVolumePercent.toFixed(
      1
    )} %</strong><br>
  `;
}
