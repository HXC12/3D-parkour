#pragma once

#include<string>
#include<iostream>
#include<vector>
#include"shader.h"
#include"Mesh.h"
#include <assimp/Importer.hpp>
#include <assimp/scene.h>
#include <assimp/postprocess.h>
unsigned int TextureFromFile(const char *path, const std::string &directory, bool gamma = false);
class Model
{
public:
	/*  ����   */
	Model() {
		
	}
	void init(std::string const &path)
	{
		loadModel(path);
		position = glm::mat4(1.0f);
	}
	void Draw(shader shader);
	glm::mat4 position;
private:
	/*  ģ������  */
	std::vector<Mesh> meshes;
	std::string directory;
	std::vector<Texture> textures_loaded;	
	// stores all the textures loaded so far, optimization to make sure textures aren't loaded more than once.
	/*  ����   */
	void loadModel(std::string const &path);
	void processNode(aiNode *node, const aiScene *scene);
	Mesh processMesh(aiMesh *mesh, const aiScene *scene);
	std::vector<Texture> loadMaterialTextures(aiMaterial *mat, aiTextureType type,
		std::string typeName);
	
};

