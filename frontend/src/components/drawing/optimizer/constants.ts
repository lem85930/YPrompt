
export const ART_MEDIUMS = [
  { value: "Photography", label: "摄影 (Photography)" },
  { value: "Digital Illustration", label: "数字插画 (Digital Illustration)" },
  { value: "Oil Painting", label: "油画 (Oil Painting)" },
  { value: "Watercolor", label: "水彩 (Watercolor)" },
  { value: "Anime / Manga", label: "动漫/漫画 (Anime/Manga)" },
  { value: "3D Render", label: "3D渲染 (3D Render)" },
  { value: "Concept Art", label: "概念艺术 (Concept Art)" },
  { value: "Matte Painting", label: "遮罩绘景 (Matte Painting)" },
  { value: "Vector Art", label: "矢量图 (Vector Art)" },
  { value: "Pencil Sketch", label: "铅笔素描 (Pencil Sketch)" },
  { value: "Ink Drawing", label: "水墨/墨线 (Ink Drawing)" },
  { value: "Ukiyo-e", label: "浮世绘 (Ukiyo-e)" },
  { value: "Pixel Art", label: "像素画 (Pixel Art)" },
  { value: "Polaroid", label: "拍立得 (Polaroid)" },
  { value: "Stop Motion", label: "定格动画 (Stop Motion)" },
  { value: "Claymation", label: "黏土动画 (Claymation)" },
  { value: "Papercut", label: "剪纸风格 (Papercut)" },
  { value: "Blueprint", label: "蓝图/工程图 (Blueprint)" },
  { value: "Charcoal", label: "炭笔画 (Charcoal)" },
  { value: "Pastel", label: "粉笔画 (Pastel)" },
  { value: "Gouache", label: "水粉 (Gouache)" },
  { value: "Acrylic", label: "丙烯 (Acrylic)" },
  { value: "Graffiti", label: "涂鸦 (Graffiti)" },
  { value: "Stained Glass", label: "彩绘玻璃 (Stained Glass)" },
  { value: "Risograph", label: "孔版印刷 (Risograph)" },
  { value: "Linocut", label: "亚麻油毡浮雕 (Linocut)" }
];

export const VISUAL_STYLES = [
  // --- Adjectives / Aesthetics (Added as requested) ---
  { value: "Ethereal", label: "空灵/飘渺 (Ethereal)" },
  { value: "Elegant", label: "优雅 (Elegant)" },
  { value: "High Fidelity", label: "高保真 (High Fidelity)" },
  { value: "Atmospheric", label: "大气氛围 (Atmospheric)" },
  { value: "Intricate", label: "错综复杂 (Intricate)" },
  { value: "Organic", label: "有机结构 (Organic)" },
  { value: "Geometric", label: "几何感 (Geometric)" },
  { value: "Opulent", label: "富丽堂皇 (Opulent)" },
  { value: "Rustic", label: "质朴/乡村 (Rustic)" },
  { value: "Whimsical", label: "异想天开 (Whimsical)" },
  { value: "Grimdark", label: "黑暗严酷 (Grimdark)" },
  { value: "Psychedelic", label: "迷幻 (Psychedelic)" },

  // --- Standard Styles ---
  { value: "Photorealistic", label: "照片级真实 (Photorealistic)" },
  { value: "Cinematic", label: "电影感 (Cinematic)" },
  { value: "Anime Style", label: "日系动漫 (Anime Style)" },
  { value: "Makoto Shinkai Style", label: "新海诚风 (Makoto Shinkai)" },
  { value: "Studio Ghibli", label: "吉卜力风 (Studio Ghibli)" },
  { value: "Cyberpunk", label: "赛博朋克 (Cyberpunk)" },
  { value: "Steampunk", label: "蒸汽朋克 (Steampunk)" },
  { value: "Solarpunk", label: "太阳朋克 (Solarpunk)" },
  { value: "Vaporwave", label: "蒸汽波 (Vaporwave)" },
  { value: "Synthwave", label: "合成波 (Synthwave)" },
  { value: "Noir", label: "黑色电影 (Noir)" },
  { value: "Minimalist", label: "极简主义 (Minimalist)" },
  { value: "Surrealism", label: "超现实主义 (Surrealism)" },
  { value: "Impressionism", label: "印象派 (Impressionism)" },
  { value: "Abstract", label: "抽象主义 (Abstract)" },
  { value: "Art Nouveau", label: "新艺术运动 (Art Nouveau)" },
  { value: "Art Deco", label: "装饰艺术 (Art Deco)" },
  { value: "Gothic", label: "哥特式 (Gothic)" },
  { value: "Baroque", label: "巴洛克 (Baroque)" },
  { value: "Rococo", label: "洛可可 (Rococo)" },
  { value: "Bauhaus", label: "包豪斯 (Bauhaus)" },
  { value: "Pixar Style", label: "皮克斯风格 (Pixar Style)" },
  { value: "Disney 2D", label: "迪士尼2D (Disney 2D)" },
  { value: "Low Poly", label: "低多边形 (Low Poly)" },
  { value: "Isometric", label: "等轴测视图 (Isometric)" },
  { value: "Flat Design", label: "扁平化设计 (Flat Design)" },
  { value: "Line Art", label: "线条艺术 (Line Art)" },
  { value: "Pop Art", label: "波普艺术 (Pop Art)" },
  { value: "Retro 80s", label: "80年代复古 (Retro 80s)" },
  { value: "Dystopian", label: "反乌托邦 (Dystopian)" },
  { value: "Fantasy", label: "奇幻 (Fantasy)" },
  { value: "Dark Fantasy", label: "暗黑奇幻 (Dark Fantasy)" },
  { value: "Sci-Fi", label: "科幻 (Sci-Fi)" }
];

export const RENDERERS = [
  { value: "Unreal Engine 5", label: "虚幻引擎5 (Unreal Engine 5)" },
  { value: "Octane Render", label: "Octane渲染 (Octane Render)" },
  { value: "Redshift", label: "Redshift" },
  { value: "V-Ray", label: "V-Ray" },
  { value: "Arnold", label: "Arnold" },
  { value: "Blender Cycles", label: "Blender Cycles" },
  { value: "Corona Render", label: "Corona" },
  { value: "Unity", label: "Unity Engine" },
  { value: "Cinema 4D", label: "Cinema 4D" },
  { value: "Maya", label: "Maya" },
  { value: "ZBrush", label: "ZBrush" },
  { value: "CryEngine", label: "CryEngine" },
  { value: "Marmoset Toolbag", label: "Marmoset Toolbag" },
  { value: "Substance Designer", label: "Substance材质 (Substance)" }
];

export const SHOT_TYPES = [
  { value: "Extreme Close-up", label: "极致特写 (Extreme Close-up)" },
  { value: "Close-up", label: "特写 (Close-up)" },
  { value: "Medium Shot", label: "中景 (Medium Shot)" },
  { value: "Cowboy Shot", label: "七分身/牛仔景 (Cowboy Shot)" },
  { value: "Full Shot", label: "全景 (Full Shot)" },
  { value: "Wide Angle", label: "广角 (Wide Angle)" },
  { value: "Ultra Wide Angle", label: "超广角 (Ultra Wide Angle)" },
  { value: "Fisheye Lens", label: "鱼眼 (Fisheye)" },
  { value: "Aerial View", label: "航拍/上帝视角 (Aerial View)" },
  { value: "Bird's Eye View", label: "鸟瞰 (Bird's Eye)" },
  { value: "Worm's Eye View", label: "虫视/仰视 (Worm's Eye)" },
  { value: "Low Angle", label: "低角度仰拍 (Low Angle)" },
  { value: "High Angle", label: "高角度俯拍 (High Angle)" },
  { value: "Dutch Angle", label: "荷兰角/倾斜 (Dutch Angle)" },
  { value: "Over-the-shoulder", label: "过肩镜头 (Over-the-shoulder)" },
  { value: "POV", label: "第一人称 (POV)" },
  { value: "Selfie", label: "自拍 (Selfie)" },
  { value: "Drone Shot", label: "无人机拍摄 (Drone Shot)" },
  { value: "Macro", label: "微距 (Macro)" },
  { value: "Telephoto", label: "长焦 (Telephoto)" },
  { value: "Bokeh", label: "背景虚化 (Bokeh)" },
  { value: "Depth of Field", label: "景深 (Depth of Field)" }
];

export const LIGHTING = [
  { value: "Natural Light", label: "自然光 (Natural Light)" },
  { value: "Golden Hour", label: "黄金时刻 (Golden Hour)" },
  { value: "Blue Hour", label: "蓝调时刻 (Blue Hour)" },
  { value: "Cinematic Lighting", label: "电影级布光 (Cinematic Lighting)" },
  { value: "Rembrandt Lighting", label: "伦勃朗光 (Rembrandt Lighting)" },
  { value: "Volumetric Lighting", label: "体积光/丁达尔 (Volumetric Lighting)" },
  { value: "God Rays", label: "耶酥光 (God Rays)" },
  { value: "Neon Lights", label: "霓虹灯 (Neon Lights)" },
  { value: "Bioluminescence", label: "生物荧光 (Bioluminescence)" },
  { value: "Rim Light", label: "轮廓光 (Rim Light)" },
  { value: "Backlight", label: "逆光 (Backlight)" },
  { value: "Softbox", label: "柔光箱 (Softbox)" },
  { value: "Hard Light", label: "硬光 (Hard Light)" },
  { value: "Studio Lighting", label: "摄影棚光 (Studio Lighting)" },
  { value: "Mood Lighting", label: "氛围光 (Mood Lighting)" },
  { value: "Chiaroscuro", label: "明暗对照 (Chiaroscuro)" },
  { value: "Overcast", label: "阴天漫射 (Overcast)" },
  { value: "Split Lighting", label: "侧光/阴阳脸 (Split Lighting)" },
  { value: "Butterfly Lighting", label: "蝴蝶光 (Butterfly Lighting)" }
];

export const COMPOSITION = [
  { value: "Rule of Thirds", label: "三分法 (Rule of Thirds)" },
  { value: "Center Framed", label: "中心构图 (Center Framed)" },
  { value: "Symmetrical", label: "对称构图 (Symmetrical)" },
  { value: "Golden Ratio", label: "黄金分割 (Golden Ratio)" },
  { value: "Leading Lines", label: "引导线 (Leading Lines)" },
  { value: "Negative Space", label: "留白 (Negative Space)" },
  { value: "Framing", label: "框架构图 (Framing)" },
  { value: "Dynamic Action", label: "动态构图 (Dynamic Action)" },
  { value: "Diagonal", label: "对角线 (Diagonal)" },
  { value: "Triangle Composition", label: "三角形构图 (Triangle)" },
  { value: "Knolling", label: "平铺整理 (Knolling)" }
];

export const SUBJECT_EXAMPLES = [
    { value: "A futuristic cyborg cat", label: "机械猫 (Cyborg Cat)" },
    { value: "An astronaut exploring Mars", label: "宇航员 (Astronaut)" },
    { value: "A serene zen garden", label: "禅意花园 (Zen Garden)" },
    { value: "A bustling cyberpunk street food vendor", label: "赛博摊贩 (Street Vendor)" },
    { value: "A majestic dragon coiled around a tower", label: "盘龙 (Dragon)" },
    { value: "A cute anime girl with blue hair", label: "动漫少女 (Anime Girl)" }
];

export const ENV_EXAMPLES = [
    { value: "Dystopian city ruins", label: "废土城市 (Ruins)" },
    { value: "Underwater coral reef", label: "海底珊瑚 (Coral Reef)" },
    { value: "Snowy mountain peak at sunset", label: "雪山日落 (Mountain Sunset)" },
    { value: "Nebula in deep space", label: "深空星云 (Nebula)" },
    { value: "Cozy library with fireplace", label: "温馨图书馆 (Library)" },
    { value: "Tokyo street at night", label: "东京夜景 (Tokyo Street)" }
];

export const LOGIC_EXAMPLES = [
    { value: "Gravity defying floating islands", label: "反重力岛屿 (Floating Islands)" },
    { value: "Hyper-detailed mechanical parts", label: "超精细机械 (Hyper-detailed)" },
    { value: "Perfectly symmetrical reflection", label: "完美倒影 (Symmetrical)" },
    { value: "Exploding into colorful particles", label: "粒子爆炸 (Particles)" },
    { value: "8k resolution, masterpiece", label: "8K画质 (8K Resolution)" }
];
