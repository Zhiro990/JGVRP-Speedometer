let engine_status = false;

let latest = {
	gear: null,
	speed: null,
	rpm: null,
	fuel: null,
	turn_left: null,
	turn_right: null,
	lights: null,
	seatbelt: null,
	health: null
};

const _getElm = document.querySelector.bind(document);

function _getPic(folder, name) {
	return "/pictures/" + folder + "/" + name + ".svg";
}

function setEngine(state) {
	engine_status = state;

	_getElm("#engine-indicator").src = _getPic("engine", state ? "on" : "off");

	if (state) {
		if (latest.gear != null) setGear(latest.gear);
		if (latest.speed != null) setSpeed(latest.speed);
		if (latest.rpm != null) setRPM(latest.rpm);
		if (latest.fuel != null) setFuel(latest.fuel);
		if (latest.turn_left != null) setTurnLeft(latest.turn_left);
		if (latest.turn_right != null) setTurnRight(latest.turn_right);
		if (latest.lights != null) setLights(latest.lights);
		if (latest.seatbelt != null) setSeatbelt(latest.seatbelt);
		if (latest.health != null) setHealth(latest.health);
	} else {
		setGear(null);
		setSpeed(null);
		setRPM(null);
		setFuel(null);
		setTurnLeft(null);
		setTurnRight(null);
		setLights(null);
		setSeatbelt(null);
		setHealth(null);
	}
}

function setGear(gear) {
	if (gear != null) latest.gear = gear;

	_getElm("#gear-value").textContent = engine_status ? gear : "-";
}

function setSpeed(speed) {
	if (speed != null) latest.speed = speed;

	_getElm("#speed-value").textContent = engine_status ? speed : "-";
}

function setRPM(rpm) {
	if (rpm != null) latest.rpm = rpm;

	const degree = (rpm / 8000) * 220;

	_getElm("#rpm #arrow-positioner").style.transform =
		`rotate(${engine_status ? (degree > 220 ? 220 : degree) : 0}deg)`;
}

function setFuel(fuel) {
	if (fuel != null) latest.fuel = fuel;

	const degree = fuel * 66.64;

	_getElm("#fuel #arrow-positioner").style.transform =
		`rotate(${engine_status ? (degree > 66.64 ? 66.64 : degree) : 0}deg)`;

	_getElm("#fuel-indicator").src = _getPic(
		"fuel",
		engine_status ? (fuel <= 0.2 ? "runout" : "enough") : "off"
	);
}

function setTurnLeft(state) {
	if (state != null) latest.turn_left = state;

	_getElm("#turn-left-indicator").src = _getPic(
		"turn-left",
		engine_status && state ? "on" : "off"
	);
}

function setTurnRight(state) {
	if (state != null) latest.turn_right = state;

	_getElm("#turn-right-indicator").src = _getPic(
		"turn-right",
		engine_status && state ? "on" : "off"
	);
}

function setLights(state) {
	if (state != null) latest.lights = state;

	switch (state) {
		case 0:
			state = "off";

			break;

		case 1:
			state = "on";

			break;

		case 2:
			state = "high";

			break;
	}

	_getElm("#lights-indicator").src = _getPic(
		"lights",
		engine_status ? state : "off"
	);
}

function setSeatbelt(state) {
	if (state != null) latest.seatbelt = state;

	_getElm("#seatbelt-indicator").src = _getPic(
		"seatbelt",
		engine_status ? (state ? "attached" : "detached") : "off"
	);
}

function setHealth(health) {
	if (health != null) latest.health = health;

	_getElm("#health-percentage").textContent = engine_status
		? health * 100 + "%"
		: "-";

	_getElm("#health-color").style.transform = `translateY(-${health * 100}%)`;
}
