As we can see from HTML/CSS, the slider is a `<div>` with a colored background, that contains a runner -- another `<div>` with `position:relative`.

<<<<<<< HEAD
ここでは、水平なドラッグ&ドロップです。

要素を配置するために、ハンドルに対して、`position:relative` とスライダーに相対的な座標を使います。ここでは　`position:absolute`　を使うよりもより便利です。
=======
To position the runner we use `position:relative`, to provide the coordinates relative to its parent, here it's more convenient here than `position:absolute`.

Then we implement horizontal-only Drag'n'Drop with limitation by width.
>>>>>>> ea7738bb7c3616bb51ff14ae3db2a2747d7888ff
