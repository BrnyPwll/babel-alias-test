# Duplicate Warning Example
While using babel-plugin-module-alias to remove unsightly and largely unmaintainable morse code from various paths, I discovered that it threw a warning about duplicate modules, mostly in React.

This was apparently due to webpack finding the same module twice in two different locations - first using the full absolute path on the disk, and after using the current directory path. This, despite the fact that both folders were technically the same.

So, I created this project to demonstrate the issue, in the hopes that others can replicate.

To have a go, there are two gulp tasks:

 - alias
 - relative
