import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, FieldArray } from "formik";
import useUser from "../../hooks/useUser";
import useSkill from "../../hooks/useSkill";
import Header from "../../components/Header";
import { Box, Heading, Text, Button, Grid, GridItem, Badge, Divider } from "@chakra-ui/react";
import Loading from "../../components/Loading";
import NormalTextField from "../../components/Form/NormalTextField";
import { UserDetailsSchema } from "../../Validations/UserValidation";

const UserDetails = () => {
    const { id } = useParams();
    const { data: userData, loading: userLoading, error: userError, getUserById, updateUser } = useUser();
    const { allSkills, userSkills, loading: skillsLoading, error: skillsError, getAllSkills, getUserSkills } = useSkill();

    console.log("allSkills:", allSkills)
    console.log("userSkills:", userSkills)
    console.log("userData:", userData)
    const initialValues = {
        username: userData.username || "",
        firstname: userData.firstname || "",
        lastname: userData.lastname || "",
        email: userData.email || "",
        mobile: userData.mobile || "",
        landline: userData.landline || "",
        skills: userData.skills || [],
    };

    const handleUpdate = async (values) => {
        await updateUser(id, values);
    };
    
    useEffect(() => {
        getUserById(id);
        getAllSkills();
        getUserSkills(id);
    }, [id]);

    if(userLoading || skillsLoading) return <Loading />;
  return (
    <Box m="20px">
        {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header  title="Users details" subtitle="" />
      </Box>

      <Box background="white" display="flex" flexDirection="column" maxW={{ base: "100%", md: 800, xl: 1000 }}>
        
        <Formik
            initialValues={initialValues}
            validationSchema={UserDetailsSchema}
            onSubmit={handleUpdate}
        >
            {formik => (
                <Form>
                    <Grid
                        templateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
                        gap="30px"
                        mx="auto"
                        m="20px"
                    >
                        <GridItem colSpan={[1, 4]} textAlign="left" mt="20px">
                            <Heading color="#91818A">{userData.firstname} {userData.lastname}</Heading>
                            <Badge colorScheme="green">{userData.role_name}</Badge>
                        </GridItem>
                        <GridItem colSpan={[1, 4]}>
                            <NormalTextField label="Username" name="username" placeholder="Username" />
                        </GridItem>
                        <GridItem colSpan={[1, 2]}>
                            <NormalTextField label="First Name" name="firstname" placeholder="First Name" />
                        </GridItem>
                        <GridItem colSpan={[1, 2]}>
                            <NormalTextField label="Last Name" name="lastname" placeholder="Last Name" />
                        </GridItem>
                        <GridItem colSpan={[1, 4]}>
                            <NormalTextField label="Email" name="email" placeholder="Email" />
                        </GridItem>
                        <GridItem colSpan={[1, 2]}>
                            <NormalTextField label="Mobile" name="mobile" placeholder="Mobile" />
                        </GridItem>
                        <GridItem colSpan={[1, 2]}>
                            <NormalTextField label="Landline" name="landline" placeholder="Landline" />
                        </GridItem>
                        <GridItem colSpan={[1, 4]}>
                            <Divider />
                        </GridItem>
                        <GridItem colSpan={[1, 4]} textAlign="left" mt="5px">
                            <Text as="b" color="gray.500" fontSize="xl">Skills</Text>
                        </GridItem>
                        
                        <FieldArray
                            name="skills"
                            render={arrayHelpers => (
                                <div>
                                    {formik.values.skills && formik.values.skills.length > 0 ? (
                                        formik.values.skills.map((skill, index) => (
                                            <div key={index}>
                                                <NormalTextField 
                                                    label="Skill" 
                                                    type="select" 
                                                    name={`skills[${index}].skill_id`} 
                                                    options={allSkills.map(skill => ({ value: skill.skill_id, label: skill.skill_name }))} 
                                                    defaultValue={userData.skills.skill_name}
                                                />
                                                <NormalTextField 
                                                    label="Experience Years" 
                                                    type="number" 
                                                    name={`skills[${index}].experience_years`} 
                                                />
                                                <NormalTextField 
                                                    label="Hourly Wage" 
                                                    type="number" 
                                                    name={`skills[${index}].hourly_wage`} 
                                                />
                                                <Button onClick={() => arrayHelpers.remove(index)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        ))
                                    ) : null}
                                    <Button onClick={() => arrayHelpers.push({ skill_id: '', experience_years: '', hourly_wage: '' })}>
                                        Add Skill
                                    </Button>
                                </div>
                            )}
                        />
                        
                        <GridItem colSpan={[1, 4]} textAlign="center" mt="20px">
                            <Button
                            colorScheme="green"
                            fontWeight="bold"
                            mt="4"
                            type="submit"
                            disabled={userLoading}
                            >
                                Update
                            </Button>
                        </GridItem>                 
                    </Grid>
                </Form>   
            )}          
        </Formik>

        {/* ERROR MSG */}
        {(skillsError || userError) && (
          <Text 
            fontSize="2em"
            as="b" 
            color="red"
            textAlign="center"
          >
            {skillsError ? skillsError.message : userError.message}
          </Text>
        )}
      </Box>
    </Box>
  )
}

export default UserDetails;