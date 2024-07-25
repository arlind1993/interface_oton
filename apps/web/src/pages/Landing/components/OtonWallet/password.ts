
const getColorGradient = (percentage: number) => {
    const red = [255, 0, 0];
    const yellow = [255, 255, 0];
    const green = [0, 255, 0];
  
    let color;
    if (percentage <= 50) {
      color = interpolateColor(red, yellow, percentage / 50);
    } else {
      color = interpolateColor(yellow, green, (percentage - 50) / 50);
    }
  
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };
  
const interpolateColor = (color1: Array<number>, color2 : Array<number>, factor: number) => {
    return color1.map((channel, index) => {
        return Math.round(channel + factor * (color2[index] - channel));
    });
};

export const calculateStrength = (password: string) => {
    const data = {
        color: '',
        score: 0,
        label: '',
    }

    const criteria = [
        { test: (pwd: string) => pwd.length >= 8, score: 25 },
        { test: (pwd: string) => pwd.length >= 12, score: 25 },
        { test: (pwd: string) => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /\d/.test(pwd), score: 30 },
        { test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd), score: 20 },
        { test: (pwd: string) => /^123|abc|aaa|111|qwerty|password$/i.test(pwd), score: -25 }
    ]

    const labelise = [
        {test: (score: number) => score >= 80, label : 'Strong'},
        {test: (score: number) => score >= 60, label : 'Good'},
        {test: (score: number) => score >= 40, label : 'Moderate'},
        {test: (score: number) => true, label : 'Weak'},
    ]

    for (const { test, score} of criteria) {
        if (test(password)) data.score += score;
    }
    for (const { test, label} of labelise) {
        if (test(data.score)) {
            data.label = label;
            break;
        }
    }
    data.color = getColorGradient(data.score);
    
    return data;
}