# I Ching Sphere
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

An interactive 3D visualization of the I Ching hexagrams arranged in a spherical formation. This project uses Three.js to create an immersive, explorable representation of the 64 hexagrams of the I Ching.

![Screenshot](https://github.com/user-attachments/assets/887a526e-2b93-40dc-a05e-f78858bd3d24)



## 🔮 Features

- **Interactive 3D Sphere**: Navigate through all 64 hexagrams positioned in a spherical arrangement
- **Intuitive Controls**: Rotate, zoom, and interact with the sphere using mouse or touch controls
- **Hexagram Details**: Click/tap on any hexagram to view its details including number, name in Chinese, pinyin, and English translation
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Performance Optimized**: Adaptive rendering based on device capabilities

## 🚀 Live Demo

[Live Demo](edisedis777.github.io/I-Ching-Sphere/) 

## 🧩 About the I Ching

The I Ching (易經), or "Book of Changes," is an ancient Chinese divination text dating back to the 9th century BCE. It consists of 64 hexagrams, each composed of six horizontal lines that can be either solid (yang) or broken (yin). This application arranges these hexagrams in a spherical pattern, with special emphasis on the pole hexagrams:

- **North Pole**: Hexagram 1 (乾 Qián) - "The Creative"
- **South Pole**: Hexagram 2 (坤 Kūn) - "The Receptive"

The arrangement follows a logical pattern with multiple levels, creating a meaningful spatial relationship between related hexagrams.

## 💻 Technologies Used
- [Three.js](https://threejs.org/) - 3D JavaScript library
- JavaScript (ES6+)
- HTML5 & CSS3

## 🛠️ Installation & Setup
1. Clone the repository:
   ```
   git clone https://github.com/your-username/i-ching-sphere.git
   cd i-ching-sphere
   ```

2. Since this is a pure frontend project with ES modules, you'll need to serve it using a local server:
   
   Using Python:
   ```
   python -m http.server
   ```
   
   Or using Node.js's live-server:
   ```
   npx live-server
   ```

3. Open your browser and navigate to `http://localhost:8000` (or the port specified by your local server)
## 📱 Usage

- **Drag** to rotate the sphere
- **Scroll/Pinch** to zoom in or out
- **Click/Tap** on any hexagram to view its details
- Use the **Reset View** button to return to the default perspective

## 📂 Project Structure
```
i-ching-sphere/
├── index.html              # Main HTML file
├── script.js               # Main application script
├── hexagramsRendering.js   # Hexagram positioning and rendering functions
├── hexagramsData.js        # Hexagram data and positioning data
├── hexagrams.csv           # Source data for hexagrams
└── README.md               # This file
```

## 📊 Data Source
The hexagram data used in this project is sourced from [Wikibooks I Ching](https://en.wikibooks.org/wiki/I_Ching/The_64_Hexagrams), providing authentic traditional Chinese characters, pinyin transcriptions, and English translations for each hexagram.

## 🔄 Performance Considerations
The application includes several optimizations for mobile devices:
- Adaptive rendering quality based on device capabilities
- Reduced geometry complexity on mobile devices
- Optimized texture sizes for better performance
- Frame rate limiting for consistent experience across devices

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Credits
- [Three.js](https://threejs.org/) for the 3D rendering capabilities
- [I Ching on Wikibooks](https://en.wikibooks.org/wiki/I_Ching/The_64_Hexagrams) for the hexagram data

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
