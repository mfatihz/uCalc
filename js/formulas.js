export const formulas = {
    "triangle":{
        "image": "image/Triangle.png",
        "formula": {
            "area": {
                "description": "Luas Segitiga = alas x tinggi / 2",
                "function": (base, height) => base * height / 2,
                "output": (base, height) => `Luas Segitiga = ${base} x ${height} / 2`,
            },
            "perimeter": {
                "description": "Keliling Segitiga = sisi<sub>A</sub> + sisi<sub>B</sub> + sisi<sub>C</sub>",
                "function": (sideA, sideB, sideC) => sideA + sideB + sideC,
                "output": (a, b, c) => `Keliling Segitiga = ${a} + ${b} + ${c}`,
            },
        },
    },
    "rectangle":{
        "image": "image/Rectangle.png",
        "formula": {
            "area": {
                "description": "Luas Segiempat = panjang x lebar",
                "function": (width, height) => width * height,
                "output": (width, height) => `Luas Segiempat = ${width} x ${height}`,
            },
            "perimeter": {
                "description": "Keliling Segiempat = (panjang + lebar) x 2",
                "function": (width, height) => (width + height) * 2,
                "output": (width, height) => `Keliling Segiempat = (${width} + ${height}) x 2`,
            },
        },
    },
    "circle":{
        "image": "image/Rectangle.png",
        "formula": {
            "area": {
                "description": "Luas Lingkaran = pi x radius<sup>2</sup>",
                "function": (radius) => Math.PI * (radius ** 2),
                "output": (radius) => `Luas Lingkaran = ${Math.PI} x ${radius}<sup>2</sup>`,
            },
            "perimeter": {
                "description": "Keliling Lingkaran = pi x radius x 2",
                "function": (radius) => Math.PI * radius * 2,
                "output": (radius) => `Keliling Lingkaran = ${Math.PI} x ${radius} x 2`,
            },
        },
    },
};

export const inputLabels = {
    "rectangle": "segiempat",
    "triangle": "segitiga",
    "area": "luas",
    "perimeter": "keliling",
    "base": "alas",
    "height": "tinggi",
    "radius": "jari-jari",
    "sideA": "sisi<sub>A</sub>",
    "sideB": "sisi<sub>B</sub>",
    "sideC": "sisi<sub>C</sub>",
    "width": "lebar",
}

/* 
export const planes = [
    {
        "plane": "triangle",
        "image": "image/Triangle.png",
        "formula": {
            "area": {
                "description": "Luas Segitiga = alas x tinggi / 2",
                "function": (base, height) => base * height / 2,
                "output": (base, height) => `Luas Segitiga = ${base} x ${height} / 2`,
            },
            "perimeter": {
                "description": "Keliling Segitiga = sisi<sub>A</sub> + sisi<sub>B</sub> + sisi<sub>C</sub>",
                "function": (sideA, sideB, sideC) => sideA + sideB + sideC,
                "output": (a, b, c) => `Keliling Segitiga = ${a} + ${b} + ${c}`,
            },
        },
    },
    {
        "plane": "rectangle",
        "image": "image/Rectangle.png",
        "formula": {
            "area": {
                "description": "Luas Segiempat = panjang x lebar",
                "function": (width, height) => width * height,
                "output": (width, height) => `Luas Segiempat = ${width} x ${height}`,
            },
            "perimeter": {
                "description": "Keliling Segiempat = (panjang + lebar) x 2",
                "function": (width, height) => (width + height) * 2,
                "output": (width, height) => `Keliling Segiempat = (${width} + ${height}) x 2`,
            },
        },
    },
    {
        "plane": "circle",
        "image": "image/Rectangle.png",
        "formula": {
            "area2": {
                "description": "Luas Lingkaran = pi x radius<sup>2</sup>",
                "function": (radius) => Math.PI * (radius ** 2),
                "output": (radius) => `Luas Lingkaran = ${Math.PI} x ${radius}<sup>2</sup>`,
            },
            "perimeter2": {
                "description": "Keliling Lingkaran = pi x radius x 2",
                "function": (radius) => Math.PI * radius * 2,
                "output": (radius) => `Keliling Lingkaran = ${Math.PI} x ${radius} x 2`,
            },
        },
    },
];

export const inputLabels = {
    "rectangle": "segiempat",
    "triangle": "segitiga",
    "area": "luas",
    "perimeter": "keliling",
    "base": "alas",
    "height": "tinggi",
    "radius": "jari-jari",
    "sideA": "sisi<sub>A</sub>",
    "sideB": "sisi<sub>B</sub>",
    "sideC": "sisi<sub>C</sub>",
    "width": "lebar",
} */