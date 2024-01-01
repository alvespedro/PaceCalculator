const METERS_IN_MILE = 1609.34;


function calculatePace(unitSystem, distance, minutesPace, secondsPace) {
    
    let distanceInMeters;
    
    if (unitSystem === 'miles') {
        distanceInMeters = distance * METERS_IN_MILE;
    } else if (unitSystem === 'kilometers') {
        distanceInMeters = distance * 1000; // Kilometers to meters
    } else {
        // Handle other unit systems if needed
        return { error: 'Invalid unit system' };
    }


    // Calculate the total pace in minutes per kilometer
    const totalPace = minutesPace + secondsPace / 60;

    // Calculate total time in minutes
    const totalTimeMinutes = distanceInMeters / 1000 * totalPace;

    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalTimeMinutes / 60);
    const minutes = Math.floor(totalTimeMinutes % 60);
    const seconds = Math.floor((totalTimeMinutes % 1) * 60);

    // Calculate speed in kilometers per hour
    const speedKmPerHour = 60 / totalPace;

    return {
        time: {
            hours,
            minutes,
            seconds
        },
        speedKmPerHour: speedKmPerHour.toFixed(2)
    };
}

function calculatePaceFromTotalMinutes(distance, unitSystem, hours, minutes, seconds) {

    const totalTimeMinutes = (hours * 60 )+ minutes + (seconds / 60);
    let pace;

    if (unitSystem === 'miles') {
        pace = totalTimeMinutes / distance;
    } else if (unitSystem === 'kilometers') {
        pace = totalTimeMinutes / distance;
    } else {
        throw new Error('Invalid unit system');
    }

    const paceMinutes = Math.floor(pace);
    const paceSeconds = Math.floor((pace - paceMinutes) * 60);

    const formattedPace = `${paceMinutes.toString().padStart(2, '0')}:${paceSeconds.toString().padStart(2, '0')}`;
    
    return formattedPace;
}

module.exports = {calculatePace,calculatePaceFromTotalMinutes}