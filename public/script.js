let engine_status = false;

let latest = {
	gear: null,
	speed: null,
	rpm: null,
	fuel: null,
	left: null,
	right: null,
	headlights: null,
	seatbelts: null,
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
		if (latest.left != null) setLeftIndicator(latest.left);
		if (latest.right != null) setRightIndicator(latest.right);
		if (latest.headlights != null) setHeadlights(latest.headlights);
		if (latest.seatbelts != null) setSeatbelts(latest.seatbelts);
		if (latest.health != null) setHealth(latest.health);
	} else {
		setGear(null);
		setSpeed(null);
		setRPM(null);
		setFuel(null);
		setLeftIndicator(null);
		setRightIndicator(null);
		setHeadlights(null);
		setSeatbelts(null);
		setHealth(null);
	}
}

function setGear(gear) {
	if (gear != null) latest.gear = gear;

	_getElm("#gear-value").textContent = engine_status ? gear : "-";
}

function setSpeed(speed) {
	if (speed != null) latest.speed = speed;

	_getElm("#speed-value").textContent = engine_status
		? Math.round(speed * 3.6)
		: "-";
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

function setLeftIndicator(state) {
	if (state != null) latest.left = state;

	_getElm("#left-indicator").src = _getPic(
		"left",
		engine_status && state ? "on" : "off"
	);

	if (state) {
		setRightIndicator(false);
		latest.right = false;
	}
}

function setRightIndicator(state) {
	if (state != null) latest.right = state;

	_getElm("#right-indicator").src = _getPic(
		"right",
		engine_status && state ? "on" : "off"
	);

	if (state) {
		setLeftIndicator(false);
		latest.left = false;
	}
}

function setHeadlights(state) {
	if (state != null) latest.headlights = state;

	switch (state) {
		case 1:
			state = "on";

			break;

		case 2:
			state = "high";

			break;

		default:
			state = "off";

			break;
	}

	_getElm("#headlights-indicator").src = _getPic(
		"headlights",
		engine_status ? state : "off"
	);
}

function setSeatbelts(state) {
	if (state != null) latest.seatbelts = state;

	_getElm("#seatbelts-indicator").src = _getPic(
		"seatbelts",
		engine_status ? (state ? "attached" : "detached") : "off"
	);
}

function setHealth(health) {
	if (health != null) latest.health = health;

	_getElm("#health-percentage").textContent = engine_status
		? Math.ceil(health * 100) + "%"
		: "-";

	_getElm("#health-color").style.transform = engine_status
		? `translateY(-${health * 100}%)`
		: "";
}
