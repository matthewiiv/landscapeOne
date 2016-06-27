
		var completedCameraMoves = [];
    var positions = [];
    var normals = []
    var colors = [];


			var container, stats;
			var camera, scene, renderer;
			var mesh;
			init();
			animate();
			function init() {

				container = document.getElementById( 'container' );

        //Set up scene camera and lights

				camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 3500 );
				camera.position.z = 150;
        camera.position.y = 100;
        camera.rotation.x = -Math.PI / 5;

				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0x050505, 2000, 3500 );
				//
				scene.add( new THREE.AmbientLight( 0x444444 ) );
				var light1 = new THREE.DirectionalLight( 0xffffff, 0.5 );
				light1.position.set( 1, 1, 1 );
				scene.add( light1 );
				// var light2 = new THREE.DirectionalLight( 0xffffff, 1.5 );
				// light2.position.set( 0, -1, 0 );
				// scene.add( light2 );
        //////////////////////////
				var squares = 10000;
				var geometry = new THREE.BufferGeometry();

				var heightSeed = [];
				var heightSeedMod = [];

				for (var k = 0; k < Math.sqrt(squares) + 1; k++) {
					if (k < Math.sqrt(squares) / 2) {
						heightSeed.push(heightSeed[k-1] + Math.random() - 0.2 || 0)
					} else {
						heightSeed.push(heightSeed[k-1] + Math.random() - 0.8 || 0)
					}
				}

 				var arrPos = 0
				var offset = Math.sqrt(squares) / 2

				function calculateNormals(vector1, vector2, vector3) {
					var normal1 = new THREE.Vector3()
					var normal2 = new THREE.Vector3()

					normal1.subVectors(vector3, vector2)
					normal2.subVectors(vector1, vector2)

					normal1.cross(normal2).normalize()
					return normal1;
				}

				function addXYZValues (array, vector){
					array.push(vector.x)
					array.push(vector.y)
          for (var j = 0, len = squares / Math.sqrt(squares); j < len; j++ ) {
					array.push(vector.z)
				}




						heightSeedMod = heightSeed.map(function(height, index) {
							return (height + heightSeed[index - 1] + heightSeed[index + 1] + heightSeed[index - 1]) / 4 + Math.random() - 0.5 ||
							(height + heightSeed[index + 1]) / 2 + Math.random() - 0.5 ||
							0;
						})

					for (var i = 0; i < len; i++ ) {
						// positions

						// 1
						var v1 = new THREE.Vector3 (i - offset, heightSeed[i], j - offset)
						// 2
						var v2 = new THREE.Vector3 (i + 1 - offset, heightSeed[i + 1], j - offset)
						// 3
						var v3 = new THREE.Vector3 (i - offset, heightSeedMod[i], j + 1 - offset)
						// 4
						var v4 = new THREE.Vector3 (i + 1 - offset, heightSeedMod[i + 1], j + 1 - offset)

						addXYZValues(positions, v1)
						addXYZValues(positions, v2)
						addXYZValues(positions, v3)
						addXYZValues(positions, v2)
						addXYZValues(positions, v3)
						addXYZValues(positions, v4)
						//
						var triangle1Normal = calculateNormals(v1, v2, v3)
						var triangle2Normal = calculateNormals(v2, v3, v4)

						addXYZValues(normals, triangle1Normal)
						addXYZValues(normals, triangle1Normal)
						addXYZValues(normals, triangle1Normal)
						addXYZValues(normals, triangle2Normal)
						addXYZValues(normals, triangle2Normal)
						addXYZValues(normals, triangle2Normal)

	          //Colours

						function addColors(vector) {
							if (vector.y > 10) {
								return new THREE.Vector3(0.8, 0.8, 0.8);
							} else if (vector.y > 5) {
								return new THREE.Vector3(0.54, 0.27, 0.074);
							} else {
								return new THREE.Vector3(0.1, 0.8, 0.1);
							}
						}

						addXYZValues(colors, addColors(v1))
						addXYZValues(colors, addColors(v2))
						addXYZValues(colors, addColors(v3))
						addXYZValues(colors, addColors(v2))
						addXYZValues(colors, addColors(v3))
						addXYZValues(colors, addColors(v4))
					}
					heightSeed = heightSeedMod
				}

				geometry.addAttribute( 'position', new THREE.BufferAttribute( Float32Array.from(positions), 3 ) );
				geometry.addAttribute( 'normal', new THREE.BufferAttribute( Float32Array.from(normals), 3 ) );
				geometry.addAttribute( 'color', new THREE.BufferAttribute( Float32Array.from(colors), 3 ) );
				geometry.computeBoundingSphere();

				var material = new THREE.MeshPhongMaterial( {
					color: 0xaaaaaa, specular: 0xffffff, shininess: 1000,
					side: THREE.DoubleSide, vertexColors: THREE.VertexColors
				} );

				mesh = new THREE.Mesh( geometry, material );
				scene.add( mesh );
				//
				renderer = new THREE.WebGLRenderer( { antialias: false } );
				renderer.setClearColor( scene.fog.color );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.gammaInput = true;
				renderer.gammaOutput = true;
				container.appendChild( renderer.domElement );
				//
				stats = new Stats();
				container.appendChild( stats.dom );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}

			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}

			function render() {
				renderer.render( scene, camera );
			}

			function animate() {
				requestAnimationFrame( animate );
				render();
				stats.update();
			}
