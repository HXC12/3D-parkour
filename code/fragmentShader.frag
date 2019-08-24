#version 330 core
out vec4 FragColor;
in vec3 normal;
in vec3 ourPosition;
in vec3 ourColor;
in vec2 TexCoords;
uniform sampler2D texture0;
uniform sampler2D texture1;
//uniform vec3 objectColor;
uniform vec3 lightPos;
uniform vec3 viewPos;
in vec3 fragPos;

struct Material
{
//vec3 ambient;
//vec3 diffuse;
//vec3 specular;
sampler2D diffuse;
sampler2D specular;
sampler2D emission;
float shininess;//�����
};

struct Light {
    vec3 position;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
	 float constant;
    float linear;
    float quadratic;
};
struct DirLight {
    vec3 direction;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};  
struct PointLight {
    vec3 position;

    float constant;
    float linear;
    float quadratic;

    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
};  
#define NR_POINT_LIGHTS 4
uniform PointLight pointLights[NR_POINT_LIGHTS];
uniform DirLight dirLight;
uniform Light light;
uniform Material material;

vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir);
vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir);
void main()
{
   vec3 norm=normalize(normal);
   vec3 viewDir=normalize(viewPos-fragPos);
   float distance    = length(light.position - fragPos);
   float attenuation = 1.0 / (light.constant + light.linear * distance + 
                light.quadratic * (distance * distance));
   vec3 lightDir=normalize(light.position-fragPos);
   vec3 refletDir=reflect(-lightDir,norm);
   float spec=pow(max(dot(viewDir,refletDir),0.0),material.shininess);
   float diff= max(dot(norm,lightDir),0.0);
   vec3 diffuse=diff*light.diffuse*vec3(texture(material.diffuse,TexCoords));
   vec3 ambient=vec3(texture(material.diffuse, TexCoords))*light.ambient;
   //���32�Ǹ߹�ķ����(Shininess)��һ������ķ����Խ�ߣ�����������Խǿ��ɢ���Խ�٣��߹��ͻ�ԽС��
   vec3 specular=vec3(texture(material.specular, TexCoords))*spec*light.specular;
   vec3 emission=vec3(texture(material.emission,TexCoords));
   ambient  *= attenuation; 
   diffuse  *= attenuation;
   specular *= attenuation;
   vec3 result= (ambient+diffuse+specular);
   //FragColor = mix(texture(texture0,TexCoord),texture(texture1,TexCoord),0.5f);//mix����������ͼƬ���ں�
   FragColor = vec4(result,1.0);
}

vec3 CalcDirLight(DirLight light, vec3 normal, vec3 viewDir)
{
    vec3 lightDir = normalize(-light.direction);
    // ��������ɫ
    float diff = max(dot(normal, lightDir), 0.0);
    // �������ɫ
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    // �ϲ����
    vec3 ambient  = light.ambient  * vec3(texture(material.diffuse, TexCoords));
    vec3 diffuse  = light.diffuse  * diff * vec3(texture(material.diffuse, TexCoords));
    vec3 specular = light.specular * spec * vec3(texture(material.specular, TexCoords));
    return (ambient + diffuse + specular);
}
vec3 CalcPointLight(PointLight light, vec3 normal, vec3 fragPos, vec3 viewDir)
{
    vec3 lightDir = normalize(light.position - fragPos);
    // ��������ɫ
    float diff = max(dot(normal, lightDir), 0.0);
    // �������ɫ
    vec3 reflectDir = reflect(-lightDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    // ˥��
    float distance    = length(light.position - fragPos);
    float attenuation = 1.0 / (light.constant + light.linear * distance + 
                 light.quadratic * (distance * distance));    
    // �ϲ����
    vec3 ambient  = light.ambient  * vec3(texture(material.diffuse, TexCoords));
    vec3 diffuse  = light.diffuse  * diff * vec3(texture(material.diffuse, TexCoords));
    vec3 specular = light.specular * spec * vec3(texture(material.specular, TexCoords));
    ambient  *= attenuation;
    diffuse  *= attenuation;
    specular *= attenuation;
    return (ambient + diffuse + specular);
}