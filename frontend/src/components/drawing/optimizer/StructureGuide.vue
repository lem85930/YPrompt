<template>
  <div class="flex flex-col w-full space-y-8 pb-10">

    <!-- 0. OFFICIAL FORMULA -->
    <div class="bg-gradient-to-br from-indigo-50 via-blue-50 to-white border border-indigo-100 rounded-xl p-4 mb-8 shadow-sm relative overflow-hidden shrink-0">
      <div class="absolute top-0 right-0 p-2 opacity-10">
        <Layers class="w-24 h-24 text-indigo-500" />
      </div>

      <div class="relative z-10">
        <h3 class="text-sm font-bold text-indigo-900 flex items-center gap-2 mb-4">
          <Sparkles class="w-4 h-4 text-indigo-600" />
          {{ props.activeLang === 'cn' ? "分层叙事架构 (Layered Narrative Framework)" : "Layered Narrative Framework" }}
        </h3>

        <!-- 1. 核心公式 -->
        <div class="mb-5 bg-white/60 rounded-lg p-3 border border-indigo-50/50">
          <p class="text-xs text-slate-700 font-medium mb-2">
            <template v-if="props.activeLang === 'cn'">标准高质量提示词的同心圆结构（五个维度）：</template>
            <template v-else>The 5-Layer Concentric Circle Structure for high-quality prompts:</template>
          </p>
          <div class="flex flex-wrap items-center gap-2 text-[10px] font-mono text-indigo-700 bg-indigo-100/50 p-2 rounded border border-indigo-100">
            <span class="font-bold">[1. Style 风格]</span>
            <ArrowRight class="w-3 h-3 text-indigo-400" />
            <span class="font-bold">[2. Scene 环境]</span>
            <ArrowRight class="w-3 h-3 text-indigo-400" />
            <span class="font-bold">[3. Subject 主体]</span>
            <ArrowRight class="w-3 h-3 text-indigo-400" />
            <span class="font-bold">[4. Text 文字]</span>
            <ArrowRight class="w-3 h-3 text-indigo-400" />
            <span class="font-bold">[5. Specs 参数]</span>
          </div>
        </div>

        <!-- 2. 五步构建法 -->
        <div>
          <h4 class="text-xs font-bold text-indigo-800 mb-2 flex items-center gap-1">
            <Layers class="w-3 h-3" />
            {{ props.activeLang === 'cn' ? "五步构建法 (The 5-Step Execution Protocol)" : "The 5-Step Execution Protocol" }}
          </h4>
          <p class="text-[11px] text-slate-600 leading-relaxed mb-3">
             <template v-if="props.activeLang === 'cn'">Gemini 依靠语言模型理解空间。使用<span class="font-bold">逻辑连接词</span>（首先/接着/然后/最后）引导模型按顺序构建画面层次：</template>
             <template v-else>Gemini relies on language understanding for spatial logic. Use <b>sequential connectors</b> (First/Next/Then/Finally) to guide the model:</template>
          </p>

          <div class="space-y-2">
            <div class="flex gap-2 items-start text-[10px]">
              <span class="bg-indigo-600 text-white px-1.5 py-0.5 rounded font-bold shrink-0">1</span>
              <div>
                <span class="font-bold text-slate-700">{{ props.activeLang === 'cn' ? "首先 (First) - 确立基调" : "First - Style & Medium" }}</span>
                <br/>
                <span class="text-slate-500 font-mono">{{ props.activeLang === 'cn' ? '"首先，确立一张赛博朋克风格的写实照片..."' : '"First, establish a photorealistic cyberpunk style..."' }}</span>
              </div>
            </div>
            <div class="flex gap-2 items-start text-[10px]">
              <span class="bg-indigo-500 text-white px-1.5 py-0.5 rounded font-bold shrink-0">2</span>
              <div>
                <span class="font-bold text-slate-700">{{ props.activeLang === 'cn' ? "接着 (Next) - 构建环境" : "Next - Scene & Context" }}</span>
                <br/>
                <span class="text-slate-500 font-mono">{{ props.activeLang === 'cn' ? '"接着，构建一个雨夜的未来东京街头背景..."' : '"Next, create a futuristic Tokyo street at night..."' }}</span>
              </div>
            </div>
            <div class="flex gap-2 items-start text-[10px]">
              <span class="bg-indigo-400 text-white px-1.5 py-0.5 rounded font-bold shrink-0">3</span>
              <div>
                <span class="font-bold text-slate-700">{{ props.activeLang === 'cn' ? "然后 (Then) - 刻画主体" : "Then - Subject Core" }}</span>
                <br/>
                <span class="text-slate-500 font-mono">{{ props.activeLang === 'cn' ? '"然后，在画面中心放置一位女性生化人..."' : '"Then, in the center, place a female cyborg..."' }}</span>
              </div>
            </div>
            <div class="flex gap-2 items-start text-[10px]">
              <span class="bg-indigo-300 text-white px-1.5 py-0.5 rounded font-bold shrink-0">4</span>
              <div>
                <span class="font-bold text-slate-700">{{ props.activeLang === 'cn' ? "然后 (Then) - 植入文字 [可选]" : "Then - Text & Typography [Optional]" }}</span>
                <br/>
                <span class="text-slate-500 font-mono">{{ props.activeLang === 'cn' ? '"然后，在头顶悬挂红色霓虹灯招牌写着..."' : '"Then, above her head, add a neon sign..."' }}</span>
              </div>
            </div>
            <div class="flex gap-2 items-start text-[10px]">
              <span class="bg-indigo-200 text-white px-1.5 py-0.5 rounded font-bold shrink-0">5</span>
              <div>
                <span class="font-bold text-slate-700">{{ props.activeLang === 'cn' ? "最后 (Finally) - 技术参数" : "Finally - Tech Specs" }}</span>
                <br/>
                <span class="text-slate-500 font-mono">{{ props.activeLang === 'cn' ? '"最后，应用35mm镜头，f/1.8光圈虚化背景..."' : '"Finally, render with 35mm lens, f/1.8 aperture..."' }}</span>
              </div>
            </div>
          </div>

          <div class="mt-4 p-3 bg-indigo-50 border-l-2 border-indigo-400 rounded-r">
             <div class="text-[10px] font-bold text-indigo-800 mb-2">
                {{ props.activeLang === 'cn' ? "完整示例 (Full Example):" : "Full Example:" }}
             </div>
             <p class="text-[10px] text-indigo-700/80 italic leading-relaxed mb-2">
               <template v-if="props.activeLang === 'cn'">
                 "首先，确立一张极具电影感的赛博朋克风格照片基调。接着，构建一个雨夜的未来东京街头背景，地面反射着潮湿的光泽。然后，在画面中心放置一位年轻的女性生化人，身穿透明塑料雨衣。然后，在人物头顶悬挂显眼的红色霓虹灯招牌写着'GEMINI'。最后，应用35mm镜头，f/1.8光圈虚化背景。"
               </template>
               <template v-else>
                 "First, establish a photorealistic cinematic cyberpunk style. Next, create a futuristic Tokyo street at night with rain-slicked ground reflections. Then, in the center, place a young female cyborg wearing a transparent raincoat. Then, above her, add a red neon sign spelling 'GEMINI'. Finally, render with 35mm lens, f/1.8 aperture for shallow depth of field."
               </template>
             </p>
          </div>

          <div class="mt-3 bg-amber-50 border border-amber-100 rounded-lg p-3">
             <h5 class="flex items-center gap-1 text-[10px] font-bold text-amber-800 mb-2">
                <Lightbulb class="w-3 h-3 text-amber-500" />
                {{ props.activeLang === 'cn' ? "为什么这很重要？(Why it Matters)" : "Why it Matters" }}
             </h5>
             <p class="text-[10px] text-amber-900/80 leading-relaxed">
               <template v-if="props.activeLang === 'cn'">
                 当你使用<span class="font-bold">"首先...接着...最后"</span>时，你是在告诉模型：<span class="font-bold">先渲染背景层，再渲染前景层</span>。这能有效解决<span class="font-bold">主体与背景融合错误</span>、<span class="font-bold">空间位置错乱</span>以及<span class="font-bold">文字变形</span>问题。
               </template>
               <template v-else>
                 When you use <b>"First... Next... Finally"</b>, you tell the model to <b>render background layers first, then foreground</b>. This solves common issues like subject-background blending, spatial confusion, and text distortion.
               </template>
             </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 1. ART STYLE -->
    <section>
      <SectionTitle :icon="Palette" :title="props.activeLang === 'cn' ? '艺术风格 (Art Style)' : 'Art Style'" colorClass="text-blue-600" />
      <p class="text-xs text-slate-600 leading-relaxed">
        {{ props.activeLang === 'cn' ? "定义画面的整体基调。Gemini 支持从传统的油画材质到现代的数字渲染引擎。混合使用不同的媒介和渲染器通常能产生独特的视觉效果。" : "Defines the overall tone. Gemini supports everything from traditional oil painting to modern digital rendering. Mixing mediums usually yields unique results." }}
      </p>
      <ExampleBox
        prompt="Cyberpunk style, Oil Painting medium, Unreal Engine 5 render"
        :desc="props.activeLang === 'cn' ? '将古典油画质感与未来科技题材结合' : 'Combining classical texture with futuristic themes'"
      />
      <ProTip>
        <template v-if="props.activeLang === 'cn'">尝试"冲突美学"：用传统的媒介（如水彩）去描绘高科技场景（如宇宙飞船），往往比单纯的数字插画更具艺术感。</template>
        <template v-else>Try 'Conflicting Aesthetics': Use traditional mediums (like Watercolor) to depict high-tech scenes (like Spaceships).</template>
      </ProTip>
      <Cheatsheet :title="props.activeLang === 'cn' ? '常用风格库' : 'Style Library'" :items="[...ART_MEDIUMS, ...VISUAL_STYLES, ...RENDERERS]" :activeLang="props.activeLang" />
    </section>

    <!-- 2. SUBJECT -->
    <section>
      <SectionTitle :icon="User" :title="props.activeLang === 'cn' ? '核心主体 (Subject)' : 'Subject'" colorClass="text-blue-600" />
      <p class="text-xs text-slate-600 leading-relaxed">
        {{ props.activeLang === 'cn' ? "这是画面的主角。描述越具体，AI 越不容易产生幻觉。遵循公式：[数量] + [形容词] + [主体名词] + [正在做的动作] + [穿着/装备]。" : "The protagonist. Be specific. Formula: [Quantity] + [Adjective] + [Noun] + [Action] + [Attire]." }}
      </p>
      <ExampleBox
        prompt="A fluffy astronaut cat wearing a damaged spacesuit, chasing a laser pointer"
        :desc="props.activeLang === 'cn' ? '包含了形态(Fluffy)、身份(Astronaut)、装备细节(Damaged)和动态(Chasing)' : 'Includes form, identity, equipment detail, and dynamic action.'"
      />
    </section>

    <!-- 3. ENVIRONMENT -->
    <section>
      <SectionTitle :icon="Mountain" :title="props.activeLang === 'cn' ? '环境与光影 (Env & Light)' : 'Environment & Light'" colorClass="text-amber-600" />
      <p class="text-xs text-slate-600 leading-relaxed">
         {{ props.activeLang === 'cn' ? "环境不仅是背景，它决定了光线的来源。光影是营造氛围的关键。" : "Environment dictates light sources. Lighting is key to mood." }}
      </p>
      <ProTip>
        <template v-if="props.activeLang === 'cn'">使用具体的"时刻"词汇（如 Golden Hour, Blue Hour）比单纯描述"Good lighting"效果好得多。体积光 (Volumetric Lighting) 能增加画面的空气感和深度。</template>
        <template v-else>Use specific timing terms (Golden Hour, Blue Hour). Volumetric Lighting adds depth and atmosphere.</template>
      </ProTip>
      <Cheatsheet :title="props.activeLang === 'cn' ? '光影与场景' : 'Lighting & Scene'" :items="LIGHTING" :activeLang="props.activeLang" />
    </section>

    <!-- 4. CAMERA -->
    <section>
      <SectionTitle :icon="Camera" :title="props.activeLang === 'cn' ? '摄影运镜 (Camera)' : 'Camera'" colorClass="text-emerald-600" />
      <p class="text-xs text-slate-600 leading-relaxed">
         {{ props.activeLang === 'cn' ? "像导演一样思考。控制观众的视点和焦距。" : "Think like a director. Control the viewpoint and focus." }}
      </p>
      <div class="grid grid-cols-2 gap-2 my-3">
           <div class="bg-slate-50 p-2 rounded border border-slate-100">
              <div class="text-[10px] font-bold text-slate-500 mb-1">Macro (微距)</div>
              <div class="text-[10px] text-slate-400">昆虫、水滴、纹理细节</div>
           </div>
           <div class="bg-slate-50 p-2 rounded border border-slate-100">
              <div class="text-[10px] font-bold text-slate-500 mb-1">Wide Angle (广角)</div>
              <div class="text-[10px] text-slate-400">风景、宏大建筑、史诗感</div>
           </div>
           <div class="bg-slate-50 p-2 rounded border border-slate-100">
              <div class="text-[10px] font-bold text-slate-500 mb-1">Low Angle (低机位)</div>
              <div class="text-[10px] text-slate-400">让主体显得高大、压迫感</div>
           </div>
           <div class="bg-slate-50 p-2 rounded border border-slate-100">
              <div class="text-[10px] font-bold text-slate-500 mb-1">Bokeh (虚化)</div>
              <div class="text-[10px] text-slate-400">突出主体，模糊背景</div>
           </div>
      </div>
      <Cheatsheet :title="props.activeLang === 'cn' ? '常用镜头参数' : 'Camera Specs'" :items="[...SHOT_TYPES, ...COMPOSITION]" :activeLang="props.activeLang" />
    </section>

    <!-- 5. TYPOGRAPHY -->
    <section>
      <SectionTitle :icon="Type" :title="props.activeLang === 'cn' ? '文字渲染 (Typography)' : 'Typography'" colorClass="text-pink-600" />
      <p class="text-xs text-slate-600 leading-relaxed mb-2">
         {{ props.activeLang === 'cn' ? "Gemini 3/Imagen 3 拥有极强的文字生成能力。必须严格使用双引号包裹文字内容。" : "Gemini 3 excels at text. Strictly use double quotes for text content." }}
      </p>
      <div class="bg-pink-50 border border-pink-100 rounded-lg p-3">
          <div class="flex items-center gap-2 text-pink-700 font-bold text-xs mb-2">
              <Quote class="w-3 h-3" />
              <span>语法规则 (Syntax)</span>
          </div>
          <code class="block bg-white border border-pink-200 rounded p-2 text-[10px] font-mono text-pink-600 mb-2">
             text "HELLO WORLD" written on a neon sign
          </code>
          <ul class="list-disc list-inside text-[10px] text-slate-600 space-y-1">
              <li>使用英文双引号 <code>""</code></li>
              <li>指定介质 (written on paper, carved in stone)</li>
              <li>指定字体风格 (bold font, calligraphy, handwriting)</li>
          </ul>
      </div>
    </section>

    <!-- 6. LOGIC -->
    <section>
      <SectionTitle :icon="Brain" :title="props.activeLang === 'cn' ? '逻辑与约束 (Logic)' : 'Logic'" colorClass="text-indigo-600" />
      <p class="text-xs text-slate-600 leading-relaxed">
         {{ props.activeLang === 'cn' ? "定义物理规则或打破它们。Gemini 默认倾向于物理真实，如果你需要超现实效果，必须明确指出。" : "Define physics or break them. Gemini leans towards realism; be explicit for surrealism." }}
      </p>
      <ExampleBox
        prompt="Logic: Anti-gravity floating islands, water flowing upwards"
        :desc="props.activeLang === 'cn' ? '明确指示反重力效果，否则模型可能会修正为正常物理现象' : 'Explicitly requesting anti-gravity to override default physics.'"
      />
    </section>

  </div>
</template>

<script setup lang="ts">
import { Camera, Palette, Type, User, Mountain, Brain, Lightbulb, Sparkles, Quote, Layers, ArrowRight } from 'lucide-vue-next'
import { ART_MEDIUMS, SHOT_TYPES, LIGHTING, VISUAL_STYLES, RENDERERS, COMPOSITION } from './constants'
import SectionTitle from './guide/SectionTitle.vue'
import ProTip from './guide/ProTip.vue'
import ExampleBox from './guide/ExampleBox.vue'
import Cheatsheet from './guide/Cheatsheet.vue'

interface Props {
  activeLang: 'cn' | 'en'
}

const props = defineProps<Props>()
</script>
