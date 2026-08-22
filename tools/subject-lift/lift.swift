// Subject lift via Vision's foreground-instance mask. Local, free, offline.
// usage: lift <in.png> <out.png>
import Foundation
import Vision
import CoreImage
import AppKit

let args = CommandLine.arguments
guard args.count == 3 else { fputs("usage: lift <in> <out>\n", stderr); exit(2) }
guard let src = CIImage(contentsOf: URL(fileURLWithPath: args[1])) else {
    fputs("cannot read \(args[1])\n", stderr); exit(1)
}
let handler = VNImageRequestHandler(ciImage: src, options: [:])
let req = VNGenerateForegroundInstanceMaskRequest()
do { try handler.perform([req]) } catch { fputs("vision failed: \(error)\n", stderr); exit(1) }
guard let obs = req.results?.first else { fputs("no subject found\n", stderr); exit(1) }
let buf: CVPixelBuffer
do {
    buf = try obs.generateMaskedImage(ofInstances: obs.allInstances,
                                      from: handler, croppedToInstancesExtent: false)
} catch { fputs("mask failed: \(error)\n", stderr); exit(1) }

let out = CIImage(cvPixelBuffer: buf)
let ctx = CIContext()
guard let png = ctx.pngRepresentation(of: out,
        format: .RGBA8, colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!) else {
    fputs("encode failed\n", stderr); exit(1)
}
try png.write(to: URL(fileURLWithPath: args[2]))
print("ok \(obs.allInstances.count) instance(s)")
