"""Export the 3D wordmark from the Blender scene for the site header.

Takes the logo object out of the animation scene, drops its keyframed spin
(the site spins it in code), stands it upright facing the camera, centres it
on the origin so it turns about its middle, and writes a binary glTF with the
metallic Principled BSDF material. Run headless:

    /Applications/Blender.app/Contents/MacOS/Blender --background animation.blend \\
        --python scripts/export-logo-model.py -- public/assets/logo-3d/team-logo.glb

An optional second argument names the object (default: Curve.005).
"""
import sys

import bpy
from mathutils import Matrix, Vector

args = sys.argv[sys.argv.index("--") + 1 :]
out_path = args[0]
object_name = args[1] if len(args) > 1 else "Curve.005"

logo = bpy.data.objects[object_name]
for obj in list(bpy.data.objects):
    if obj is not logo:
        bpy.data.objects.remove(obj, do_unlink=True)

logo.animation_data_clear()
logo.rotation_euler = (1.5707963, 0.0, 0.0)  # upright, front towards -Y (the camera)
bpy.context.view_layer.objects.active = logo
logo.select_set(True)
bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)

centre = sum((Vector(corner) for corner in logo.bound_box), Vector()) / 8
logo.data.transform(Matrix.Translation(-centre))
logo.location = (0, 0, 0)

bpy.ops.export_scene.gltf(
    filepath=out_path,
    export_format="GLB",
    use_selection=True,
    export_yup=True,
    export_apply=True,
    export_texcoords=False,
    export_normals=True,
    export_materials="EXPORT",
    export_animations=False,
    export_cameras=False,
    export_lights=False,
)
