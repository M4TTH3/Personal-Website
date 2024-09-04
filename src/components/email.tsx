"use client";

import Email from "@/models/Email";
import { faEnvelope, faSignature } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Textarea, TextInput } from "@mantine/core";
import { hasLength, isEmail, useForm } from "@mantine/form";
import axios from "axios";
import { InferCreationAttributes } from "sequelize";

export default function Contact() {

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            message: "",
        },
        validate: {
            name: hasLength({min: 1, max: 50}, 'Name must be between 1 and 50 characters.'),
            email: isEmail('Invalid email address.'),
            message: hasLength({min: 1, max: 500}, 'Message must be between 1 and 500 characters.')
        }
    })

    const handleSubmit = async (values: { name: string, email: string, message: string }) => {
        try {
            const res = await axios.post('/api/contact', values as InferCreationAttributes<Email>);
            if (res.status !== 200) throw new Error("Email failed to send!");
            
            console.log(res.data);
            form.reset();
        } catch (error) {
            console.error(error)
        }
    }

    const inputClassName = "bg-opacity-10 bg-white text-gray-200 font-bold";

    return (
        <section id="Contact" className="mt-32">
            <div className="container px-4 lg:px-2 flex flex-col sm:flex-row gap-10 text-white">
                <div className="flex-[1]">
                    <h2 className="text-4xl font-bold text-gradient">
                        Let's Get in Touch.
                    </h2>
                    <p className="text-xl text-gray-400 mt-2">
                        Feel free to reach out for collaborations, questions, or
                        just to say hi!
                    </p>
                </div>
                <div className="flex-[1] py-2">
                    <form
                        id="ContactForm"
                        className="flex flex-col gap-5 mx-auto"
                        onSubmit={form.onSubmit(handleSubmit)}
                    >
                        <TextInput
                            {...form.getInputProps("name")}
                            key={form.key("name")}
                            maxLength={50}
                            size="lg"
                            radius="md"
                            placeholder="Name"
                            classNames={{
                                input: inputClassName,
                            }}
                            color="blue"
                            rightSection={
                                <FontAwesomeIcon icon={faSignature} />
                            }
                        />
                        <TextInput
                            {...form.getInputProps("email")}
                            key={form.key("email")}
                            maxLength={320}
                            type="email"
                            size="lg"
                            radius="md"
                            placeholder="Email"
                            classNames={{
                                input: inputClassName,
                            }}
                            rightSection={<FontAwesomeIcon icon={faEnvelope} />}
                        />
                        <Textarea
                            {...form.getInputProps("message")}
                            key={form.key("message")}
                            maxLength={500}
                            size="lg"
                            radius="md"
                            placeholder="Message"
                            rows={8}
                            classNames={{
                                input: inputClassName,
                            }}
                        />
                        <Button
                            type="submit"
                            size="lg"
                            radius="md"
                            className={`bg-gray-800 w-32 shadow-gray-400 shadow-md`}
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
