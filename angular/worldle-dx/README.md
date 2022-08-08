# WorldleDx

[Markdown Cheat Sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

Features to Add
-  [ ]  Modes
    - [x] Flag mode
    -  [ ]  Capitals
    -  [ ]  Outlines
-  [ ]  Download SVG files from: [This repo]https://github.com/djaiss/mapsicon
        Clean up files by removing all the pngs: del /s *.png

-  [ ]  Add logic for bearing deviation indicator
        (show miss indicator on 2D and 3D diagrams?)

-  [ ]  Katex visualisation of the maths:
        Dynamically show equation values changing?

-  [ ]  Material UI
-  [ ]  Dark Mode
-  [ ]  Disable repeat 
-  [ ]  Freeze inputs when game completes
-  [ ]  Free text entry with autocomplete
-  [ ]  

-  [ ]  3D Visualisations
        Three JS
            [Discover Three JS](https://discoverthreejs.com/book/)
        [or [GlobeGL?](https://www.npmjs.com/package/globe.gl)...although this is just a plugin for ThreeJS


____

# Difficulties
-   Could not get d3-geo-projections to work
        Attempted to try any of these projections: 
            Patterson
            Miller
            Robinson
        Potential fix to try if spare time presents itself:
            [Ambient Declarations](https://github.com/d3/d3-geo-projection/issues/217)


Technical Debt / Refactoring
-  [ ]  Review flags and delete countries with the same flag 
    - Must only affect flag mode


Visualisation Notes:
    3 Visualisation modes based on two different appraoches:

    (1) 2D Pre-defined SVGs:
        [Mapsicon](https://github.com/djaiss/mapsicon)
            SVG elements are easily colored via CSS: https://stackoverflow.com/questions/22252472/how-to-change-the-color-of-an-svg-element


    (2) + (3) GeoJSON data fed into:
        (2) D3
            [Implementation Example](https://d3-graph-gallery.com/graph/backgroundmap_basic.html)
            [D3 Projections for maps](https://github.com/d3/d3-geo-projection)
        (3) ThreeJS + Globe
    

        GeoJSON Source Files
            [Natural Earth Vector](https://github.com/nvkelso/natural-earth-vector/tree/master/geojson)
                Specifically: [110m-resolution admin boundaries](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson)
                (it might be possible to reduce the file size but removing a number of fields from the GeoJSON file?)





Some resources:
Country names, codes and centroid lat-longs (used)
    https://developers.google.com/public-data/docs/canonical/countries_csv


[Online Great Circle Calculator](http://www.gcmap.com/)

[Spherical Geometry Equations + Calculators](https://www.movable-type.co.uk/scripts/latlong.html)


Alternative lat-longs for centroids (not used here)
https://gist.github.com/tadast/8827699


List of lat-longs by capital:
https://www.jasom.net/list-of-capital-cities-with-latitude-and-longitude/



Some of the Maths Used:
    Bearing angles:
        Solution:   https://math.stackexchange.com/questions/2688803/angle-between-two-points-on-a-sphere

            Derived from:
                [Spherical Law of Cosines](https://en.wikipedia.org/wiki/Spherical_law_of_cosines)
                [Spherical Law of Sines](https://en.wikipedia.org/wiki/Law_of_sines#The_spherical_law_of_sines)
            

    Distance Between Two Points on a Sphere:
        Solution:   https://math.stackexchange.com/questions/1304169/distance-between-two-points-on-a-sphere
        
            Derived from:   https://en.wikipedia.org/wiki/Haversine_formula
                            https://www.math.ksu.edu/~dbski/writings/haversine.pdf
        

    
    Special mention to:
        https://www.movable-type.co.uk/scripts/latlong.html
        ...which I found after the first two!


Flags from:
    https://github.com/hampusborgos/country-flags






This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
