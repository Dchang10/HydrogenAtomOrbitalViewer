			// Integrates Via Simpson's Rule

			//takes function, resolution and range and returns 3D array of values
			function simpsonIntegrate (foo, xmin, xmax, ymin, ymax, zmin, zmax, resolution){
				var coordinates = [];
				var xsteps = (xmax-xmin)/resolution;
				var ysteps = (ymax-ymin)/resolution;
				var zsteps = (zmax-zmin)/resolution;

				var currentx = xmin;
				var currenty = ymin;
				var currentz = zmin;

				var tempcurr;
				var tempmid;
				var tempafter;

				for(var i = 0; i < resolution; i++,currentx += xsteps){
					currenty = ymin;
					for(var j = 0; j < resolution; j++, currenty +=ysteps){
						currentz = zmin;	
						for(var k = 0; k < resolution; k++,currentz += zsteps){
							tempcurr = foo(currentx,currenty,currentz);
							tempmid = foo(currentx+xsteps/2,currenty+ysteps/2,currentz+zsteps/2);
							tempafter = foo(currentx+xsteps,currenty+ysteps,currentz+zsteps);
							value = xsteps*ysteps*zsteps*(tempcurr+4*tempmid+tempafter)/6;
							if (value < 0){
								coordinates.push([currentx+xsteps/2, currenty+ysteps/2, currentz+zsteps/2,Math.pow(value,2),0x0000ff]);	
							}
							else{
								coordinates.push([currentx+xsteps/2, currenty+ysteps/2, currentz+zsteps/2,Math.pow(value,2),0xff0000]);
							
							}
							
						}
						
					}
					
				}
				return coordinates;
				
			}
			//radial probability functions
			function r(x,y,z){
				return Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
			}
			function r10(x,y,z){
				var R = r(x,y,z);
				return 2*Math.exp(-R);
			}
			function r20(x,y,z){
				var R =r(x,y,z);
				return (1-R/2)*Math.exp(-R/2)/(Math.sqrt(2));
			}
			function r21(x,y,z){
				var R = r(x,y,z);
				return Math.exp(-R/2)/Math.sqrt(24);
			}
			function r30(x,y,z){
				var R =r(x,y,z);
				return (2/Math.sqrt(27))*(27-18*R+2*Math.pow(R,2))*Math.exp(-R/3);
			}
			function r31(x,y,z){
				var R =r(x,y,z);
				return R*(8/(Math.sqrt(6)*27))*(6-R)*Math.exp(-R/3);
			}
			function r32(x,y,z){
				var R =r(x,y,z);
				return Math.pow(R,2)*(4/(81*Math.sqrt(30)))*Math.exp(-R/3);
			}
			function r40(x,y,z){
				var R =r(x,y,z);
				return (1-3*R/4+Math.pow(R,2)/8-Math.pow(R,3)/192)*Math.exp(-R/4)/4;
			}
			function r41(x,y,z){
				var R = r(x,y,z);
				return R*(Math.sqrt(5)/(16*Math.sqrt(3)))*(1-R/4+Math.pow(R,2)/80)*Math.exp(-R/4);
			}
			function r42(x,y,z){
				var R = r(x,y,z);
				return Math.pow(R,2)*(1-R/12)*Math.exp(-R/4)/(64*Math.sqrt(5));
			}
			function r43(x,y,z){
				var R = r(x,y,z);
				return Math.pow(R,3)*Math.exp(-R/4)/(Math.sqrt(35)*768);
			}
			//Wave functions go here
			function n1l0m0(x,y,z){
				return 10*r10(x,y,z);
			}
			function n2l0m0(x,y,z){
				return r20(x,y,z)*4;
			}
			function n2l1mNeg1(x,y,z){
				return x*r21(x,y,z)*5;
			}
			function n2l1m0(x,y,z){
				return z*r21(x,y,z)*5;
			}
			function n2l1mPos1(x,y,z){
				return y*r21(x,y,z)*5;
			}
			function n3l0m0(x,y,z){
				return r30(x,y,z)/15;
			}
			function n3l1mNeg1(x,y,z){
				return x*r31(x,y,z)/4;
			}
			function n3l1m0(x,y,z){
				return z*r31(x,y,z)/4;
			}
			function n3l1mPos1(x,y,z){
				return y*r31(x,y,z)/4;
			}
			function n3l2mNeg2(x,y,z){
				return x*y*r32(x,y,z);
			}
			function n3l2mNeg1(x,y,z){
				return x*z*r32(x,y,z);
			}
			function n3l2m0(x,y,z){
				return (3*Math.pow(z,2)-Math.pow(r(x,y,z),2))*r32(x,y,z);
			}
			function n3l2mPos1(x,y,z){
				return y*z*r32(x,y,z);
			}
			function n3l2mPos2(x,y,z){
				return 2*(Math.pow(x,2)-Math.pow(y,2))*r32(x,y,z);
			}
			function n4l0m0(x,y,z){
				return 2.1*r40(x,y,z)/1.2;
			}
			function n4l1mNeg1(x,y,z){
				return x*r41(x,y,z);
			}
			function n4l1m0(x,y,z){
				return z*r41(x,y,z);
			}
			function n4l1mPos1(x,y,z){
				return y*r41(x,y,z);
			}
			function n4l2mNeg2(x,y,z){
				return x*y*r42(x,y,z);
			}
			function n4l2mNeg1(x,y,z){
				return x*z*r42(x,y,z);
			}
			function n4l2m0(x,y,z){
				return (3*Math.pow(z,2)-Math.pow(r(x,y,z),2))*r42(x,y,z);
			}
			function n4l2mPos1(x,y,z){
				return y*z*r42(x,y,z);
			}
			function n4l2mPos2(x,y,z){
				return 2*(Math.pow(x,2)-Math.pow(y,2))*r42(x,y,z);
			}
			function n4l3mNeg3(x,y,z){
				return (Math.pow(x,2)-Math.pow(y,2))*r43(x,y,z);
			}
			function n4l3mNeg3(x,y,z){
				return 2*(Math.pow(x,2)-3*Math.pow(y,2))*x*r43(x,y,z)/1.2;
			}
			function n4l3mNeg2(x,y,z){
				return x*y*z*r43(x,y,z);
			}
			function n4l3mNeg1(x,y,z){
				return x*(5*Math.pow(z,2)- Math.pow(r(x,y,z),2))*r43(x,y,z);
			}
			function n4l3m0(x,y,z){
				return z*(5*Math.pow(z,2)-3*Math.pow(r(x,y,z),2))*r43(x,y,z)/1.5;
			}
			function n4l3mPos1(x,y,z){
				return y*(5*Math.pow(z,2)- Math.pow(r(x,y,z),2))*r43(x,y,z);
			}
			function n4l3mPos2(x,y,z){
				return 2*(Math.pow(x,2)-Math.pow(y,2))*z*r43(x,y,z);				
			}
			function n4l3mPos3(x,y,z){
				return 2*(3*Math.pow(x,2)-Math.pow(y,2))*y*r43(x,y,z)/1.2;
			}
			//Latex wave equation variables
			var wn1l0m0 = "\\frac{1}{\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,e^{\\frac{-r}{a_0}}";
			var wn2l0m0 = "\\frac{1}{4\\sqrt{2\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[2-\\frac{r}{a_0}\\right]\\,e^{\\frac{-r}{2\\,a_0}}";
			var wn2l1mNeg1 = "\\frac{1}{8\\sqrt{pi}\\,{a_0}^\\frac{3}{2}}\\,\\\\frac{r}{a_0}\\,e^{\\frac{-r}{2\\,a_0}}\\sin\\,\\theta\\,e^{-i\\,\\phi}";
			var wn2l1m0 = "\\frac{1}{4\\sqrt{2\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r}{a_0}\\,e^{\\frac{-r}{2\\,a_0}}\\cos\\,\\theta";
			var wn2l1mPos1 = "\\frac{1}{8\\sqrt{pi}\\,{a_0}^\\frac{3}{2}}\\,\\\\frac{r}{a_0}\\,e^{\\frac{-r}{2\\,a_0}}\\sin\\,\\theta\\,e^{i\\,\\phi}";
			var wn3l0m0 = "\\frac{1}{81\\sqrt{3\\,\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[27 - 18\\,\\frac{r}{a_0}+2\\frac{r}{a_0}^2\\right]e^{\\frac{-r}{3a_0}}";
			var wn3l1mNeg1 = "\\frac{2}{81\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[6-\\frac{r}{a_0}\\right]\\frac{r}{a_0}\\,e^\\frac{-r}{3\\,a_0}\\sin\\theta\\,e^{-i\\phi}";
			var wn3l1m0 = "\\frac{2}{81\\sqrt{6\\,\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[6-\\frac{r}{a_0}\\right]\\frac{r}{a_0}\\,e^\\frac{-r}{3\\,a_0}\\cos\\theta";
			var wn3l1mPos1 = "\\frac{2}{81\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[6-\\frac{r}{a_0}\\right]\\frac{r}{a_0}\\,e^\\frac{-r}{3\\,a_0}\\sin\\theta\\,e^{i\\phi}";
			var wn3l2mNeg2 = "\\frac{2}{162\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}\\sin^2\\theta\\,e^{-i\\,2\\phi}";
			var wn3l2mNeg1 = "\\frac{2}{81\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}\\sin\\theta\\,\\cos\\theta\\,e^{-i\\phi}";
			var wn3l2m0 = "\\frac{2}{81\\sqrt{6\\,\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}(3\\cos^2\\theta - 1)";
			var wn3l2mPos1 = "\\frac{2}{81\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}\\sin\\theta\\,\\cos\\theta\\,e^{i\\phi}";
			var wn3l2mPos2 = "\\frac{2}{162\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\frac{r^2}{{a_0}^2}e^{-\\frac{r}{3\\,a_0}}\\sin^2\\theta\\,e^{i\\,2\\phi}";
			var wn4l0m0 = "\\frac{2}{8\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{3}{4}\\,\\frac{r}{a_0} +\\frac{1}{8}\\,\\frac{r^2}{{a_0}^2}-\\frac{1}{192}\\,\\frac{r^3}{{a_0}^3}\\right]\\,e^{\\frac{-r}{4a_0}}";
			var wn4l1mNeg1 = "\\frac{\\sqrt{5}}{32\\,\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1 - \\frac{1}{4}\\,\\frac{r}{a_0}+2\\,\\frac{1}{80}\\,\\frac{r}{a_0}^2\\right]\\frac{r}{a_0}\\,e^{\\frac{-r}{4a_0}}\\,\\sin\\theta\\,e^{-i\\,\\phi}";
			var wn4l1m0 = "\\frac{\\sqrt{5}}{32\\,\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1 - \\frac{1}{4}\\,\\frac{r}{a_0}+2\\,\\frac{1}{80}\\,\\frac{r}{a_0}^2\\right]\\frac{r}{a_0}\\,e^{\\frac{-r}{4a_0}}\\,cos\\theta";
			var wn4l1mPos1 = "\\frac{\\sqrt{5}}{32\\,\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1 - \\frac{1}{4}\\,\\frac{r}{a_0}+2\\,\\frac{1}{80}\\,\\frac{r}{a_0}^2\\right]\\frac{r}{a_0}\\,e^{\\frac{-r}{4a_0}}\\,\\sin\\theta\\,e^{i\\,\\phi}";
			var wn4l2mNeg2 = "\\frac{\\sqrt{3}}{128\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}\\,\\sin\\theta \\,\\cos\\theta\\,e^{-i\\phi}";
			var wn4l2mNeg1 = "\\frac{\\sqrt{3}}{256\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}\\,\\sin^2\\theta\\,e^{-2i\\phi}";
			var wn4l2m0 = "\\frac{1}{156\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}(3\\cos^2\\theta - 1)";
			var wn4l2mPos1 = "\\frac{\\sqrt{3}}{128\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}\\,\\sin\\theta \\,\\cos\\theta\\,e^{i\\phi}";
			var wn4l2mNeg2 = "\\frac{\\sqrt{3}}{256\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\,\\left[1-\\frac{1}{12}\\,\\frac{r}{a_0}\\right]\\frac{r^2}{{a_0}^2}\\,e^\\frac{-r}{4\\,a_0}\\,\\sin^2\\theta\\,e^{2i\\phi}";
			var wn4l3mNeg3 = "\\frac{1}{6114\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin^3\\theta\\,e^{-3\\phi}";	
			var wn4l3mNeg2 = "\\frac{\\sqrt{3}}{3072\\sqrt{6\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin^2\\theta\\,\\cos\\theta\\,e^{-2i\\phi}";
			var wn4l3mNeg1 = "\\frac{\\sqrt{3}}{6114\\sqrt{5\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin\\theta\\,(5\\cos^2\\theta-1)\\,e^{-i\\phi}";
			var wn4l3m0 = "\\frac{1}{3072\\sqrt{5\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}(5\\cos^3\\theta-3\\cos\\theta)";
			var wn4l3Pos1 = "\\frac{\\sqrt{3}}{6114\\sqrt{5\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin\\theta\\,(5\\cos^2\\theta-1)\\,e^{i\\phi}";
			var wn4l3mPos2 = "\\frac{\\sqrt{3}}{3072\\sqrt{6\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin^2\\theta\\,\\cos\\theta\\,e^{2i\\phi}";
			var wn4l3mPos3 = "\\frac{1}{6114\\sqrt{\\pi}\\,{a_0}^\\frac{3}{2}}\\frac{r^3}{{a_0}^3}\\,e^{\\frac{-r}{a_0}}\\sin^3\\theta\\,e^{3\\phi}";