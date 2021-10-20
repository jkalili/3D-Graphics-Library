# Commentary

## Jason Kalili

What aspects of defining a 3D scene are successfully handled by your library behind the scenes?

- I really like how much dryer our Playground.js file got when we decided to hide the vertex shader and fragment shader after figuring out our matrix manipulations. We also made a file specifically for functions that we can export at will, which helped in simplifying code a lot. By making a scene and group classes, as well as predefining objects and their vertices, we made rendering an object much simpler than it was before. Toggling between orthographic and perspective is as simple as changing a true to a false, and lighting manipulation can be changed with a spread of three values. Using our group class methods, we can easily move composites, and we can size, scale, and rotate objects just by changing their property values.

What aspects are not handled behind the scenes? (i.e., the dev user needs to write code for them)

- Something that I retrespectively wish was handled behind the scenes is the creation of buffers. We attempted to solve this issue but could not move that function in time. The same goes with something like advanceScene, which would not be great to have to write everytime.

How much code for using your library is the same at the application level, regardless of the specific scene?

- A good chunk of what needs to be done can be imported through other classes and functions. Our group and scene classes save the developer a ton of time and effort by grouping and adding objects to the scene (to be rendered) in 1 or 2 lines. The user does not have to do any matrix calculations as all of that is handled for them in the matrix class. The user also does not have to spend the time making any of our predefined object classes. The objects we chose to predefine cover a vast majority of shapes needed to convey anything.

What aspects of your design would you keep, if you got a chance to do this library over?

- I really like the way our group and scene classes turned out, as well as the spread of function in the functions.js file that allow us to import things for different scenes. Animation also turned out to be very simple given our group and object class structure.

What aspects of your design would you change?

- Other than making code dryer and easier to get started, I think I would rework the way single objects are translated and scaled, handling x y and z values at the same time rather than with three separate lines. This would be done very easily given our structure, but unfortunely we did not quite get to it. I also think that maybe making an instace of a scene class could do more in terms of rudimentary setup (for example have an instance of the Fragment and Vertex shader rather than have to import a static one from functions).

## Adrian Leung

What aspects of defining a 3D scene are successfully handled by your library behind the scenes?

- Our library is able to handle several of the features seen in three.js such as grouping, and group funcionalities such as scaling and translating. We were able to handle many functions behind the scenes by importing shapes and functions from external files, as well as lighiting and matrix calculations. This helped simplify and organize our code a lot. This means a user need only import modules they want in their scene to utilize these funcionalites.

What aspects are not handled behind the scenes? (i.e., the dev user needs to write code for them)

- Something we were not able to handle behind the scenes are adding shapes to the scene. A user must first create a new object, then call that objects constructor to proeperly add this shape to the scene. Although not too big of a deal, this leads to more clunky-looking code.

How much code for using your library is the same at the application level, regardless of the specific scene?

- Much of our code is separated into module files which helps organize code. This is seen through examples such as Matrix.js, functions.js, and group.js, in which a user need only import desired functions from each file to utilize in any context. Additionally, shapes are easy to import and use, in just a few lines. These grouping of functionalites allows users to customize their scene while keeping their scene.js uncluttered.

What aspects of your design would you keep, if you got a chance to do this library over?

- I like our decision to export mechanical functions to their own file, functions.js, to keep all functionalities a user might need in its separate file to not clutter up a scene.js file. Additionally, our matrix.js file allowed for easy use to manipulate shapes and scenes.

What aspects of your design would you change?

- I would have liked to change our shapes functionalities such that a shape can be created and instiated in the same line, rather than in two or more lines. Additionally, manipulating shapes, such as shape.translate, requires three lines for x,y,z coordinates respectively. Regrouping these functionalites to be able to manipulate positioning in one line would be ideal.

## Carter Pon

What aspects of defining a 3D scene are successfully handled by your library behind the scenes?

- We successfully handle grouping, group scaling and translating, and lighting issues. Matrix calculations are done behind the scenes, Object creation (such as Box, Diamond, etc.) is done behind the scenes, Functions and composite composition are handled behind the scenes. The user simply has to import the functions into their particular sandbox and use them in a similar fashion.

What aspects are not handled behind the scenes? (i.e., the dev user needs to write code for them)

- Some aspects that are not handled behind the scenes is drawScene and advanceScene. The user does have to write each line of that particular function for the scene to compile. It was difficult to get around and even more difficult to discern exactly what each line of code was doing.

How much code for using your library is the same at the application level, regardless of the specific scene?

- I would point to our makeComposites.js file in /composites as well as our functions.js, Scene.js, and Group.js code to see how much code we wrote for each individual part. We also did an incredible job with Matrix.js; a lot of code that we wrote for our project is contained within that file as well. Our code did pretty well; we accomplished all that we set out to do. We can create objects within the Playground, add those objects to groups, create composite objects by specifying which composite to make, then scale, translate, or angle those groups with a few lines of code. A lot of our calculations are handled through matrix calculations as well.

What aspects of your design would you keep, if you got a chance to do this library over?

- I think that our Matrix calculations and our grouping mechanism were two solid pieces of code. Without the math from Matrix.js, and without a grouping mechanism for individual objects, it would be difficult for us to do all the things that we wanted, such as group scaling and translating.

What aspects of your design would you change?

- I was responsible for group scaling, translating, and angling. Currently, angling doesn't quite work the way it should: the object should rotate around the center of the object, rather than each individual object rotating around its own axis. If I had more time, I would be capable of specifying this behavior; I would need to calculate the individual rotations of each facet of the group(point of origin, and corresponding values to rotate), and rotate those accordingly. Sadly, the issue proved daunting, and I was thus unable to get to it in time.

## Varun Desai

What aspects of defining a 3D scene are successfully handled by your library behind the scenes?

- Our library handles grouping really well.  In my eyes I thought the way Carter wrote grouping made our grouping really similar to three.js.  This made it it so much easier to code the final scene because I was already used to the grouping code from three.js.  Also the scale matrix, translate matrix, and the rotation matrices are all done behind the scene before they are implemented into the scene and the shader. 

What aspects are not handled behind the scenes? (i.e., the dev user needs to write code for them)

- The ability to add objects to the scene is not handled behind the scenes.  We have to create the object and then also we have to make a sperate file where all the scaling, angling, and the other changes go.  

How much code for using your library is the same at the application level, regardless of the specific scene?

- Our group did a really good job at seperating everything into folders so everything was very simple to navigate.  We have a functions file, a matrix file, and a group file.  This makes it really easy to just import to the file that needs these important lines of code and use them.  It makes the code look less clunky.  

What aspects of your design would you keep, if you got a chance to do this library over?

- I would definitely keep the grouping because I am a really big fan of how it was coded and how easy it was to implemet it.  I also really like that the matrix file made it easy for us to chnage the objects as well as use the camera matrix to change how the scene was being looked at.  

What aspects of your design would you change?

- The one thing I would chnage personally would definitely be how the camer is being implemented.  First, I would definitely want to use the Vertex.js file more than what it is being used right now.  There are a lot of helper methods that use arrays which makes the code look bigger and can also have some performance issues.  It would also definitely make it easier to make user interaction with the camera easier. 

