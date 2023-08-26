export const shapes = [
    {
        "shape": "triangle",
        "image": "Triangle.png",
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
        "shape": "rectangle",
        "image": "rectangle.png",
        "formula": {
            "area": {
                "description": "Luas Segiempat = panjang x lebar",
                "function": (length, width) => length * width,
                "output": (length, width) => `Luas Segiempat = ${length} x ${width}`,
            },
            "perimeter": {
                "description": "Keliling Segiempat = (panjang + lebar) x 2",
                "function": (length, width) => (length + width) * 2,
                "output": (length, width) => `Keliling Segiempat = (${length} + ${width}) x 2`,
            },
        },
    },
    {
        "shape": "circle",
        "image": "circle.png",
        "formula": {
            "area": {
                "description": "Luas Lingkaran = pi x jari-jari<sup>2</sup>",
                "function": (radius) => Math.PI * (radius ** 2),
                "output": (radius) => `Luas Lingkaran = ${Math.PI} x ${radius}<sup>2</sup>`,
            },
            "perimeter": {
                "description": "Keliling Lingkaran = pi x jari-jari x 2",
                "function": (radius) => Math.PI * radius * 2,
                "output": (radius) => `Keliling Lingkaran = ${Math.PI} x ${radius} x 2`,
            },
        },
    },
];

export const words = {
    "rectangle": "segiempat",
    "triangle": "segitiga",
    "circle": "lingkaran",
    "area": "luas",
    "perimeter": "keliling",
    "base": "alas",
    "height": "tinggi",
    "length": "panjang",
    "radius": "jari-jari",
    "sideA": "sisi<sub>A</sub>",
    "sideB": "sisi<sub>B</sub>",
    "sideC": "sisi<sub>C</sub>",
    "width": "lebar",
}